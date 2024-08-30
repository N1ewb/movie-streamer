import Hero from "./(sections)/Hero/page";
import MovieList from "./(sections)/PopularMovies/page";
import TopRatedMovies from "./(sections)/TopRatedMovie/page";
import UpcomingMovies from "./(sections)/UpcomingMovies/page";

export default function Home() {
  return (
    <main className="flex min-h-screen relative flex-col items-center justify-between bg-black pb-80">
      <Hero />
      <MovieList />
      <TopRatedMovies />
      <UpcomingMovies />
    </main>
  );
}
