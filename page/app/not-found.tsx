export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl mb-4">Page not found</h2>
      <p className="text-muted-foreground mb-8">
        The page you're looking for doesn't exist.
      </p>
      <a href="/" className="text-primary hover:underline">
        Go back home
      </a>
    </div>
  );
}
