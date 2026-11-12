import { formatPrice } from "../utils/formatPrice";
import { useCart } from "../context/CartContext";
import QtyControl from "./QtyControl";

export default function MenuItem({ item, currency, canOrder }) {
  const { qtyOf, add, remove } = useCart();
  const unavailable = item.available === false;

  return (
    <li className={`py-4 ${unavailable ? "opacity-50" : ""}`}>
      <div className="flex gap-3">
        {item.image && (
          <img
            src={item.image}
            alt=""
            loading="lazy"
            className="size-16 shrink-0 rounded-lg object-cover"
          />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline">
            <h3 className="font-semibold text-ink">{item.name}</h3>
            <span className="leader" aria-hidden="true" />
            <span className="whitespace-nowrap font-semibold text-price tabular-nums">
              {formatPrice(item.price, currency)}
            </span>
          </div>
          {item.description && (
            <p className="mt-1 text-sm leading-relaxed text-muted">
              {item.description}
            </p>
          )}
          {unavailable && (
            <p className="mt-1 text-xs font-medium text-accent">
              غير متوفر حالياً
            </p>
          )}
          {canOrder && !unavailable && (
            <div className="mt-2 flex justify-end">
              <QtyControl
                qty={qtyOf(item.id)}
                label={item.name}
                onAdd={() => add(item)}
                onRemove={() => remove(item.id)}
              />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
