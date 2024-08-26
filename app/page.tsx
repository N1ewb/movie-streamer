// import Image from "next/image";
import MovieGenre from "./(sections)/Categories/page";
import Hero from "./(sections)/Hero/page";
// import Features from "./(pages)/Featured/page";
// import Categories from "./(pages)/Categories/page";

import MovieList from "./(sections)/Movies/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Hero />
      <MovieList />
      <MovieGenre />
    </main>
  );
}
