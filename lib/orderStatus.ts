export type StoredOrderStatus = 'NEW' | 'PAYMENT_PENDING' | 'PAYMENT_VERIFIED' | 'PROCESSING' | 'PACKED' | 'SHIPPED' | 'OUT_FOR_DELIVERY' | 'DELIVERED' | 'CANCELLED' | 'RETURNED' | 'REFUNDED' | 'REJECTED_FAILED' | 'PENDING' | 'APPROVED' | 'PAID' | 'COMPLETED' | 'DISAPPROVED';

export function getOrderStatusLabel(status: string): string {
  if (status === 'PENDING') return 'Pending';
  if (status === 'APPROVED' || status === 'PAID') return 'Approved';
  if (status === 'SHIPPED') return 'Shipped';
  if (status === 'OUT_FOR_DELIVERY') return 'Out for Delivery';
  if (status === 'DELIVERED' || status === 'COMPLETED') return 'Delivered';
  if (status === 'CANCELLED' || status === 'DISAPPROVED') return 'Cancelled / Disapproved';
  
  if (status === 'PAYMENT_PENDING') return 'Payment Pending';
  if (status === 'PAYMENT_VERIFIED') return 'Payment Verified';
  if (status === 'REJECTED_FAILED') return 'Failed/Rejected';
  
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase().replace(/_/g, ' ');
}

export function getOrderStatusTone(status: string) {
  if (status === 'COMPLETED' || status === 'DELIVERED' || status === 'PAYMENT_VERIFIED') return 'success';
  if (status === 'CANCELLED' || status === 'RETURNED' || status === 'REFUNDED' || status === 'REJECTED_FAILED' || status === 'DISAPPROVED') return 'danger';
  if (status === 'SHIPPED' || status === 'OUT_FOR_DELIVERY' || status === 'PACKED' || status === 'PROCESSING') return 'info';
  if (status === 'APPROVED' || status === 'PAID') return 'confirmed';
  if (status === 'PAYMENT_PENDING') return 'warning';
  return 'pending';
}
