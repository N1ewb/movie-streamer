import fetch from "node-fetch";
import { Genres, Movie } from "./types";

const Getoptions = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDk1ODFlNWQ1ZGZjNTc5NjBlYzhkMWY5YTVmNzQ0MyIsIm5iZiI6MTcyNDU1NzcwMi44NzcwNzQsInN1YiI6IjY2YzgyZmI1OGZlZDdjY2Q3NGMzY2MxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ied4arbplyzEc_U18Y4APreGJlgy6jyheo0WEY1IWBg",
  },
};

export const getMoviesByPopular = async (page: number): Promise<Movie[]> => {
  const URLForMovieList = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`;

  try {
    const response = await fetch(URLForMovieList, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.results;
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      throw new Error(`Failed to fetch movies: ${err.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const getMovieGenres = async (): Promise<Genres[]> => {
  const URLForGenreList =
    "https://api.themoviedb.org/3/genre/movie/list?language=en";

  try {
    const response = await fetch(URLForGenreList, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.genres;
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      throw new Error(`Failed to fetch movies: ${err.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const getTopRatedMovies = async (page: number): Promise<Movie[]> => {
  const URLForTopRated = `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`;

  try {
    const response = await fetch(URLForTopRated, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      throw new Error(`Failed to fetch movies: ${err.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const getUpcomingMovies = async (page: number): Promise<Movie[]> => {
  const URLForTopRated = `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=${page}`;

  try {
    const response = await fetch(URLForTopRated, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      throw new Error(`Failed to fetch movies: ${err.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const searchMovie = async (
  page: number,
  query: string
): Promise<Movie[]> => {
  const URLForTopRated = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=${page}`;

  try {
    const response = await fetch(URLForTopRated, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.results;
  } catch (err: Error | unknown) {
    if (err instanceof Error) {
      throw new Error(`Failed to fetch movies: ${err.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const getMovieVideos = async (id: number) => {
  const URLForMovieVideos = `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`;
  try {
    const response = await fetch(URLForMovieVideos, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.results;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const getMovieByID = async (id: number) => {
  const URLForFindByID = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;

  try {
    const response = await fetch(URLForFindByID, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return JSON.stringify(data);
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const getSimilarMovie = async (id: number) => {
  const URLSimilarMovie = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=1`;

  try {
    const response = await fetch(URLSimilarMovie, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    return data.results;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};
