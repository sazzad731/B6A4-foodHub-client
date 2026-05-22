import CartClient from "@/components/modules/customer/CartClient";

export default function AdminCartPage() {
  return (
    <CartClient
      canCheckout={false}
      checkoutUnavailableMessage="Admin accounts can review cart items, but order checkout is only available for customers."
    />
  );
}
