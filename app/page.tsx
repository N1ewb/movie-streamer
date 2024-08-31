import Hero from "./(sections)/Hero/page";
import MovieSection from "./(sections)/MovieSection/page";

export default function Home() {
  return (
    <main className="flex-1 min-h-screen relative flex-col items-center justify-between bg-black pb-80">
      <Hero />
      <MovieSection />
    </main>
  );
}
