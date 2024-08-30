import MovieSection from "./(sections)/MovieSection/page";
import Hero from "./(sections)/Hero/page";

export default function Home() {
  return (
    <main className="flex min-h-screen relative flex-col items-center justify-between bg-black pb-80">
      <Hero />
      <MovieSection />
    </main>
  );
}
