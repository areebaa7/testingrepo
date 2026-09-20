export type StoredOrderStatus = 'NEW' | 'PAYMENT_PENDING' | 'PAYMENT_VERIFIED' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED' | 'REJECTED_FAILED' | 'PENDING' | 'PAID' | 'COMPLETED';

export function getOrderStatusLabel(status: string): string {
  if (status === 'PENDING') return 'Pending';
  if (status === 'PAID') return 'Confirmed';
  if (status === 'COMPLETED') return 'Delivered';
  
  if (status === 'PAYMENT_PENDING') return 'Payment Pending';
  if (status === 'PAYMENT_VERIFIED') return 'Payment Verified';
  if (status === 'REJECTED_FAILED') return 'Failed/Rejected';
  
  // Format standard uppercase underscores to Title Case
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace(/_/g, ' ');
}

export function getOrderStatusTone(status: string) {
  if (status === 'COMPLETED' || status === 'DELIVERED' || status === 'PAYMENT_VERIFIED') return 'success';
  if (status === 'CANCELLED' || status === 'RETURNED' || status === 'REFUNDED' || status === 'REJECTED_FAILED') return 'danger';
  if (status === 'SHIPPED' || status === 'PACKED' || status === 'PROCESSING') return 'info';
  if (status === 'PAID') return 'confirmed';
  if (status === 'PAYMENT_PENDING') return 'warning';
  return 'pending';
}
