import { useEffect, useRef } from "react";

export default function CategoryNav({ categories, activeId, onSelect }) {
  const buttonRefs = useRef({});

  useEffect(() => {
    buttonRefs.current[activeId]?.scrollIntoView({
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);

  return (
    <nav
      aria-label="أقسام المنيو"
      className="sticky top-0 z-10 border-b border-ink/10 bg-page/90 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-xl gap-2 overflow-x-auto px-5 py-3 scrollbar-none">
        {categories.map((cat) => {
          const isActive = cat.id === activeId;
          return (
            <li key={cat.id} className="shrink-0">
              <button
                ref={(el) => (buttonRefs.current[cat.id] = el)}
                onClick={() => onSelect(cat.id)}
                aria-current={isActive ? "true" : undefined}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                  isActive
                    ? "bg-accent text-white"
                    : "bg-white text-ink hover:bg-white/60"
                }`}
              >
                {cat.name}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
