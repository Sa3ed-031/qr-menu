import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";

export default function CartBar({ currency, onOpen }) {
  const { count, total } = useCart();
  if (!count) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-20 p-4">
      <button
        onClick={onOpen}
        className="mx-auto flex w-full max-w-xl items-center justify-between rounded-2xl bg-accent px-5 py-4 text-white shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      >
        <span className="font-semibold">عرض الطلب ({count})</span>
        <span className="font-semibold tabular-nums">{formatPrice(total, currency)}</span>
      </button>
    </div>
  );
}
