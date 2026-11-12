export default function Footer({ restaurant }) {
  return (
    <footer className="mt-12 border-t border-ink/10 px-5 py-8 text-sm text-muted">
      <div className="mx-auto max-w-xl space-y-1">
        {restaurant.address && <p>{restaurant.address}</p>}
        {restaurant.phone && (
          <a
            href={`tel:${restaurant.phone.replace(/\s/g, "")}`}
            dir="ltr"
            className="inline-block font-medium text-accent underline-offset-4 hover:underline"
          >
            {restaurant.phone}
          </a>
        )}
      </div>
    </footer>
  );
}
