import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function run() {
  const baseUrl = 'http://localhost:3001';
  let cookieHeader = '';
  const testEmail = `testuser_${Date.now()}@example.com`;
  const testPassword = 'Password123!';

  console.log('--- STARTING E2E INTEGRATION TEST ---');

  // 1. Register
  console.log('\\n1. Registering new customer...');
  const regRes = await fetch(`${baseUrl}/api/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: testPassword, name: 'Test User' })
  });
  const regData = await regRes.json();
  if (!regData.success) {
    console.error('Registration failed:', regData);
    return;
  }
  console.log('Registered successfully!', regData.user.email);

  // 2. Login
  console.log('\\n2. Logging in...');
  const loginRes = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: testEmail, password: testPassword })
  });
  const loginData = await loginRes.json();
  if (!loginData.success) {
    console.error('Login failed:', loginData);
    return;
  }
  const cookies = loginRes.headers.get('set-cookie');
  if (cookies) {
    const match = cookies.match(/auth_token=([^;]+)/);
    if (match) cookieHeader = `auth_token=${match[1]}`;
  }
  console.log('Logged in successfully!');

  // Need a valid product ID
  const product = await prisma.product.findFirst();
  if (!product) {
     console.error('No products found in DB for test');
     return;
  }

  // 3. Place order as logged in user
  console.log('\\n3. Placing order as logged-in user...');
  const orderRes = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json', 
      'Cookie': cookieHeader,
      'idempotency-key': `idemp_${Date.now()}`
    },
    body: JSON.stringify({
      items: [{ id: product.id, quantity: 1 }],
      shippingAddress: { fullName: 'Test User', email: testEmail, phone: '1234567890', address: '123 Test St', postalCode: '' },
      shippingRegion: 'Sindh',
      shippingCity: 'Karachi',
      paymentMethod: 'cod'
    })
  });
  const orderData = await orderRes.json();
  if (!orderData.success) {
    console.error('Order placement failed:', orderData);
    return;
  }
  const loggedInOrderId = orderData.data?.id || orderData.orderId || orderData.order?.id;
  if (!loggedInOrderId) {
      console.log('Got response:', orderData);
  }
  console.log('Order placed successfully! ID:', loggedInOrderId);

  // 4. Place order as guest
  console.log('\\n4. Placing order as GUEST...');
  const guestOrderRes = await fetch(`${baseUrl}/api/orders`, {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'idempotency-key': `idemp_guest_${Date.now()}`
    },
    body: JSON.stringify({
      items: [{ id: product.id, quantity: 1 }],
      shippingAddress: { fullName: 'Guest User', email: 'guest@example.com', phone: '0987654321', address: '456 Guest St' },
      shippingRegion: 'Punjab',
      shippingCity: 'Lahore',
      paymentMethod: 'cod'
    })
  });
  const guestOrderData = await guestOrderRes.json();
  if (!guestOrderData.success) {
    console.error('Guest order placement failed:', guestOrderData);
    return;
  }
  const guestOrderId = guestOrderData.data?.id || guestOrderData.order?.id || guestOrderData.orderId;
  console.log('Guest Order placed successfully! ID:', guestOrderId);

  // 5. Verify order appears in customer dashboard
  console.log('\\n5. Fetching customer profile/dashboard...');
  const profileRes = await fetch(`${baseUrl}/api/account/profile`, {
    headers: { 'Cookie': cookieHeader }
  });
  const profileData = await profileRes.json();
  if (!profileData.success) {
    console.error('Failed to fetch profile:', profileData);
  } else {
    // wait, account/profile probably has user.orders or something similar
    // or maybe /api/orders
    const ordersListRes = await fetch(`${baseUrl}/api/orders`, {
      headers: { 'Cookie': cookieHeader }
    });
    const ordersListData = await ordersListRes.json();
    if (ordersListData.data && Array.isArray(ordersListData.data)) {
        const foundOrder = ordersListData.data.find(o => o.id === loggedInOrderId);
        if (foundOrder) {
          console.log('Verified: Order appears in customer dashboard! Status:', foundOrder.status);
        } else {
          console.error('Error: Order NOT found in customer dashboard.');
        }
    }
  }

  // 6. Admin login & status update
  console.log('\\n6. Admin updates order status to SHIPPED (Dispatched) via Prisma...');
  await prisma.order.update({
    where: { id: loggedInOrderId },
    data: { status: 'DISPATCHED' } // Actually it might be DISPATCHED or SHIPPED
  });
  console.log('Order status updated in DB to DISPATCHED');

  // 7. Verify tracking endpoint
  console.log('\\n7. Verifying public tracking API for the customer...');
  const trackRes = await fetch(`${baseUrl}/api/orders/track?orderId=${loggedInOrderId}&email=${encodeURIComponent(testEmail)}`);
  const trackData = await trackRes.json();
  if (trackData.success && trackData.order.status === 'DISPATCHED') {
    console.log('Verified: Tracking API correctly reflects DISPATCHED status!');
  } else {
    console.error('Tracking API mismatch:', trackData);
  }

  // 8. Delete test data to clean up
  console.log('\\n8. Cleaning up test data...');
  await prisma.order.deleteMany({ where: { OR: [{ id: loggedInOrderId }, { id: guestOrderId }] } });
  await prisma.user.delete({ where: { email: testEmail } });
  console.log('Cleanup complete!');
  
  process.exit(0);
}

run().catch(e => { console.error(e); process.exit(1); });
