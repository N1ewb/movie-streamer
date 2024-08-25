// import Image from "next/image";
import Footer from "./(components)/Footer";
import Header from "./(components)/Header";
import MovieGenre from "./(pages)/Categories/page";
import Hero from "./(pages)/Hero/page";
// import Features from "./(pages)/Featured/page";
// import Categories from "./(pages)/Categories/page";

import MovieList from "./(pages)/Movies/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Header />
      <Hero />
      <MovieList />
      <MovieGenre />
      <Footer />
    </main>
  );
}
