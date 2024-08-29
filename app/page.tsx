import Hero from "./(sections)/Hero/page";

import MovieList from "./(sections)/Movies/page";

export default function Home() {
  return (
    <main className="flex min-h-screen relative flex-col items-center justify-between bg-black">
      <Hero />
      <MovieList />
    </main>
  );
}
