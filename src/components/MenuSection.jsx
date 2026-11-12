import MenuItem from "./MenuItem";

export default function MenuSection({ category, currency, canOrder }) {
  return (
    <section id={category.id} className="scroll-mt-20 pt-8">
      <h2 className="font-display text-2xl font-bold text-accent">
        {category.name}
      </h2>
      <ul className="mt-2 divide-y divide-ink/10">
        {category.items.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            currency={currency}
            canOrder={canOrder}
          />
        ))}
      </ul>
    </section>
  );
}
