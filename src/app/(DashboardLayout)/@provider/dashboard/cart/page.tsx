import CartClient from "@/components/modules/customer/CartClient";

export default function ProviderCartPage() {
  return (
    <CartClient
      canCheckout={false}
      checkoutUnavailableMessage="Provider accounts can review cart items, but order checkout is only available for customers."
    />
  );
}
