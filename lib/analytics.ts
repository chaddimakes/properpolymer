import type { CartItem } from "@/app/context/cart-context";

function toGA4Item(item: CartItem) {
  return {
    item_id: item.slug,
    item_name: item.name,
    item_variant: item.variantName,
    price: item.price,
    quantity: item.quantity,
  };
}

export function trackAddToCart(item: CartItem) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "add_to_cart", {
    currency: "USD",
    value: item.price,
    items: [toGA4Item(item)],
  });
}

export function trackRemoveFromCart(item: CartItem) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "remove_from_cart", {
    currency: "USD",
    value: item.price,
    items: [toGA4Item(item)],
  });
}

export function trackBeginCheckout(items: CartItem[], totalValue: number) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "begin_checkout", {
    currency: "USD",
    value: totalValue,
    items: items.map(toGA4Item),
  });
}
