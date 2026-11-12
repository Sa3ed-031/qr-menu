import { useCallback, useEffect, useState } from "react";

import menu from "./data/menu.json";

import Header from "./components/Header";
import Footer from "./components/Footer";
import CartBar from "./components/CartBar";
import CartSheet from "./components/CartSheet";
import CategoryNav from "./components/CategoryNav";
import MenuSection from "./components/MenuSection";

import { getTableFromUrl } from "./utils/table";

const table = getTableFromUrl();

export default function App() {
  const { restaurant, theme, categories, ordering } = menu;
  const canOrder = Boolean(ordering?.enabled);
  const [activeId, setActiveId] = useState(categories[0]?.id);
  const [cartOpen, setCartOpen] = useState(false);
  const closeCart = useCallback(() => setCartOpen(false), []);

  // تحديد القسم الظاهر على الشاشة لتلوين تبويبه
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    categories.forEach((cat) => {
      const el = document.getElementById(cat.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [categories]);

  // عنوان الصفحة ولون شريط المتصفح حسب المطعم
  useEffect(() => {
    document.title = restaurant.name;
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", theme.accent);
  }, [restaurant.name, theme.accent]);

  const handleSelect = (id) => {
    document.getElementById(id)?.scrollIntoView({ block: "start" });
  };

  return (
    <div
      className="min-h-screen bg-page text-ink"
      style={{
        "--accent": theme.accent,
        "--bg": theme.bg,
        "--price": theme.price,
      }}
    >
      <Header restaurant={restaurant} />
      <CategoryNav
        categories={categories}
        activeId={activeId}
        onSelect={handleSelect}
      />
      <main className={`mx-auto max-w-xl px-5 ${canOrder ? "pb-24" : ""}`}>
        {categories.map((cat) => (
          <MenuSection
            key={cat.id}
            category={cat}
            currency={restaurant.currency}
            canOrder={canOrder}
          />
        ))}
      </main>
      <Footer restaurant={restaurant} />

      {canOrder && (
        <>
          <CartBar
            currency={restaurant.currency}
            onOpen={() => setCartOpen(true)}
          />
          <CartSheet
            open={cartOpen}
            onClose={closeCart}
            restaurant={restaurant}
            ordering={ordering}
            table={table}
          />
        </>
      )}
    </div>
  );
}
