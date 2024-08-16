import Image from "next/image";
import Hero from "./(pages)/Hero/page";
import Features from "./(pages)/Featured/page";
import Categories from "./(pages)/Categories/page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-black">
      <Hero />
      <Features />
      <Categories />
    </main>
  );
}
