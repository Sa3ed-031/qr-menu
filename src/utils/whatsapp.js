import { formatPrice } from "./formatPrice";

export const ORDER_TYPES = {
  dineIn: "داخل المحل",
  pickup: "استلام من المحل",
  delivery: "توصيل",
};

export function buildOrderMessage({ restaurant, lines, total, form, deliveryFee }) {
  const c = restaurant.currency;
  const fee = form.type === "delivery" ? deliveryFee || 0 : 0;
  const out = [`طلب جديد - ${restaurant.name}`, `نوع الطلب: ${ORDER_TYPES[form.type]}`];

  if (form.type === "dineIn") out.push(`رقم الطاولة: ${form.table}`);
  if (form.name) out.push(`الاسم: ${form.name}`);
  if (form.phone) out.push(`الهاتف: ${form.phone}`);
  if (form.type === "delivery") out.push(`العنوان: ${form.address}`);

  out.push("", "الطلب:");
  lines.forEach((l) =>
    out.push(`- ${l.qty} × ${l.item.name} = ${formatPrice(l.qty * l.item.price, c)}`)
  );

  out.push("");
  if (fee) {
    out.push(`المجموع: ${formatPrice(total, c)}`);
    out.push(`رسوم التوصيل: ${formatPrice(fee, c)}`);
  }
  out.push(`الإجمالي: ${formatPrice(total + fee, c)}`);

  if (form.notes.trim()) out.push("", `ملاحظات: ${form.notes.trim()}`);
  return out.join("\n");
}

export function buildWhatsAppLink(number, text) {
  const digits = String(number).replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
