import { useEffect, useRef, useState } from "react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/formatPrice";
import {
  ORDER_TYPES,
  buildOrderMessage,
  buildWhatsAppLink,
} from "../utils/whatsapp";
import QtyControl from "./QtyControl";

const inputClass =
  "mt-1 w-full rounded-xl border border-ink/15 bg-white px-3 py-2.5 text-ink focus:border-accent focus:outline-2 focus:outline-accent/30";

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-ink">{label}</span>
      {children}
      {error && (
        <span className="mt-1 block text-sm text-red-700">{error}</span>
      )}
    </label>
  );
}

export default function CartSheet({
  open,
  onClose,
  restaurant,
  ordering,
  table,
}) {
  const { lines, total, add, remove, clear } = useCart();
  const types = Object.keys(ORDER_TYPES).filter((t) => ordering[t]);
  const [step, setStep] = useState("cart"); // cart | shown | sent
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    type: table && ordering.dineIn ? "dineIn" : types[0],
    table,
    name: "",
    phone: "",
    address: "",
    notes: "",
  });
  const headingRef = useRef(null);
  const c = restaurant.currency;
  const fee = form.type === "delivery" ? ordering.deliveryFee || 0 : 0;

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    headingRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const validate = () => {
    const e = {};
    if (form.type === "dineIn" && !form.table.trim())
      e.table = "اكتب رقم الطاولة";
    if (form.type !== "dineIn") {
      if (!form.name.trim()) e.name = "اكتب اسمك";
      if (form.phone.replace(/\D/g, "").length < 9)
        e.phone = "اكتب رقم هاتف صحيح";
    }
    if (form.type === "delivery" && !form.address.trim())
      e.address = "اكتب عنوان التوصيل";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = () => {
    if (!validate()) return;
    if (form.type === "dineIn" && ordering.dineInMode === "show") {
      setStep("shown");
      return;
    }
    const text = buildOrderMessage({
      restaurant,
      lines,
      total,
      form,
      deliveryFee: ordering.deliveryFee,
    });
    window.open(buildWhatsAppLink(ordering.whatsapp, text), "_blank");
    setStep("sent");
  };

  const startOver = () => {
    clear();
    setStep("cart");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-30 flex items-end bg-ink/40"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        onClick={(e) => e.stopPropagation()}
        className="mx-auto max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-page px-5 pt-5 pb-8"
      >
        <div className="flex items-center justify-between">
          <h2
            id="cart-title"
            ref={headingRef}
            tabIndex={-1}
            className="font-display text-2xl font-bold text-accent outline-none"
          >
            {step === "shown" ? `طاولة ${form.table}` : "طلبك"}
          </h2>
          <button
            onClick={onClose}
            className="rounded-full px-3 py-1 text-sm text-muted focus-visible:outline-2 focus-visible:outline-accent"
          >
            إغلاق
          </button>
        </div>

        {lines.length === 0 && step === "cart" && (
          <p className="py-10 text-center text-muted">
            ما في أصناف بالطلب. اختار من المنيو واضغط "أضف".
          </p>
        )}

        {step === "sent" && (
          <div className="py-8 text-center">
            <p className="text-lg font-semibold text-ink">
              انفتح واتساب برسالة طلبك.
            </p>
            <p className="mt-2 text-muted">
              اضغط إرسال هنيك ليوصل الطلب للمحل.
            </p>
            <button
              onClick={startOver}
              className="mt-6 rounded-xl bg-accent px-6 py-3 font-semibold text-white"
            >
              طلب جديد
            </button>
          </div>
        )}

        {step === "shown" && (
          <div className="py-4">
            <p className="text-muted">اعرض هالشاشة للنادل.</p>
            <ul className="mt-4 space-y-3 text-xl">
              {lines.map((l) => (
                <li
                  key={l.item.id}
                  className="flex justify-between font-semibold"
                >
                  <span>{l.item.name}</span>
                  <span className="tabular-nums">× {l.qty}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-ink/10 pt-4 text-lg font-semibold">
              الإجمالي:{" "}
              <span className="text-price tabular-nums">
                {formatPrice(total, c)}
              </span>
            </p>
            {form.notes.trim() && (
              <p className="mt-2 text-muted">ملاحظات: {form.notes}</p>
            )}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setStep("cart")}
                className="flex-1 rounded-xl bg-white px-4 py-3 font-medium"
              >
                تعديل
              </button>
              <button
                onClick={startOver}
                className="flex-1 rounded-xl bg-accent px-4 py-3 font-semibold text-white"
              >
                طلب جديد
              </button>
            </div>
          </div>
        )}

        {step === "cart" && lines.length > 0 && (
          <>
            <ul className="mt-2 divide-y divide-ink/10">
              {lines.map((l) => (
                <li
                  key={l.item.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <p className="font-semibold">{l.item.name}</p>
                    <p className="text-sm text-price tabular-nums">
                      {formatPrice(l.qty * l.item.price, c)}
                    </p>
                  </div>
                  <QtyControl
                    qty={l.qty}
                    label={l.item.name}
                    onAdd={() => add(l.item)}
                    onRemove={() => remove(l.item.id)}
                  />
                </li>
              ))}
            </ul>

            {types.length > 1 && (
              <fieldset className="mt-5">
                <legend className="text-sm font-medium text-ink">
                  نوع الطلب
                </legend>
                <div className="mt-2 flex gap-2">
                  {types.map((t) => (
                    <button
                      key={t}
                      type="button"
                      aria-pressed={form.type === t}
                      onClick={() => setForm({ ...form, type: t })}
                      className={`flex-1 rounded-xl px-2 py-2.5 text-sm font-medium ${
                        form.type === t
                          ? "bg-accent text-white"
                          : "bg-white text-ink"
                      }`}
                    >
                      {ORDER_TYPES[t]}
                    </button>
                  ))}
                </div>
              </fieldset>
            )}

            <div className="mt-5 space-y-4">
              {form.type === "dineIn" && (
                <Field label="رقم الطاولة" error={errors.table}>
                  <input
                    value={form.table}
                    onChange={set("table")}
                    inputMode="numeric"
                    className={inputClass}
                  />
                </Field>
              )}
              {form.type !== "dineIn" && (
                <>
                  <Field label="الاسم" error={errors.name}>
                    <input
                      value={form.name}
                      onChange={set("name")}
                      autoComplete="name"
                      className={inputClass}
                    />
                  </Field>
                  <Field label="رقم الهاتف" error={errors.phone}>
                    <input
                      value={form.phone}
                      onChange={set("phone")}
                      type="tel"
                      dir="ltr"
                      autoComplete="tel"
                      className={`${inputClass} text-right`}
                    />
                  </Field>
                </>
              )}
              {form.type === "delivery" && (
                <Field label="عنوان التوصيل" error={errors.address}>
                  <textarea
                    value={form.address}
                    onChange={set("address")}
                    rows={2}
                    className={inputClass}
                  />
                </Field>
              )}
              <Field label="ملاحظات (اختياري)">
                <textarea
                  value={form.notes}
                  onChange={set("notes")}
                  rows={2}
                  placeholder="مثلاً: بدون سكر"
                  className={inputClass}
                />
              </Field>
            </div>

            <div className="mt-6 space-y-1 border-t border-ink/10 pt-4 text-sm">
              {fee > 0 && (
                <>
                  <p className="flex justify-between">
                    <span>المجموع</span>
                    <span className="tabular-nums">
                      {formatPrice(total, c)}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span>رسوم التوصيل</span>
                    <span className="tabular-nums">{formatPrice(fee, c)}</span>
                  </p>
                </>
              )}
              <p className="flex justify-between text-lg font-semibold">
                <span>الإجمالي</span>
                <span className="text-price tabular-nums">
                  {formatPrice(total + fee, c)}
                </span>
              </p>
            </div>

            <button
              onClick={submit}
              className="mt-5 w-full rounded-xl bg-accent px-4 py-3.5 font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              {form.type === "dineIn" && ordering.dineInMode === "show"
                ? "اعرض الطلب للنادل"
                : "إرسال الطلب عبر واتساب"}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
