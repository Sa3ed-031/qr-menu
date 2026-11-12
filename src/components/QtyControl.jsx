const btn =
  "flex size-9 items-center justify-center rounded-full text-lg font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export default function QtyControl({ qty, label, onAdd, onRemove }) {
  if (qty === 0) {
    return (
      <button
        onClick={onAdd}
        aria-label={`أضف ${label} للطلب`}
        className="rounded-full border border-accent px-4 py-1.5 text-sm font-medium text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        أضف
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onAdd}
        aria-label={`زيادة ${label}`}
        className={`${btn} bg-accent text-white`}
      >
        +
      </button>
      <span
        aria-live="polite"
        className="w-6 text-center font-semibold tabular-nums"
      >
        {qty}
      </span>
      <button
        onClick={onRemove}
        aria-label={`إنقاص ${label}`}
        className={`${btn} bg-white text-ink`}
      >
        −
      </button>
    </div>
  );
}
