export default function Header({ restaurant }) {
  return (
    <header className="bg-accent px-5 pt-10 pb-8 text-white">
      <div className="mx-auto max-w-xl">
        <h1 className="font-display text-5xl leading-tight font-bold">
          {restaurant.name}
        </h1>
        {restaurant.tagline && (
          <p className="mt-2 text-lg text-white/85">{restaurant.tagline}</p>
        )}
        {restaurant.hours && (
          <p className="mt-4 text-sm text-white/70">{restaurant.hours}</p>
        )}
      </div>
    </header>
  );
}
