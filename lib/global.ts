import fetch from "node-fetch";
import { Genres, Movie, TVEpisode, TVSeason, TVSeries } from "./types";

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

export const getShowVideos = async (id: number, type: "movie" | "tv") => {
  const URLForMovieVideos = `https://api.themoviedb.org/3/${type}/${id}/videos?language=en-US`;

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

export const getFanArts = async (id: number) => {
  const URLForFanArts = `https://webservice.fanart.tv/v3/movies/${id}?api_key=${`af332c8edca1f49d9e37b05de4af1e55`}`;

  try {
    const response = await fetch(URLForFanArts);
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

export const getPopularTV = async (page: number): Promise<Movie[]> => {
  const URLForTV = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`;
  try {
    const response = await fetch(URLForTV, Getoptions);
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

export const getTopRatedTV = async (page: number): Promise<Movie[]> => {
  const URLForTV = `https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=${page}`;
  try {
    const response = await fetch(URLForTV, Getoptions);
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

export const getAiringTodayTV = async (page: number): Promise<Movie[]> => {
  const URLForTV = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`;
  try {
    const response = await fetch(URLForTV, Getoptions);
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

export const getTVEpisodes = async (
  id: number,
  season: number
): Promise<TVSeason> => {
  const URLForTV = `https://api.themoviedb.org/3/tv/${id}/season/${season}?language=en-US`;
  try {
    const response = await fetch(URLForTV, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Episodes", data);
    return data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const getTVSeriesDetails = async (id: number): Promise<TVSeries> => {
  const URLForTVSeries = `https://api.themoviedb.org/3/tv/${id}?language=en-US`;
  try {
    const response = await fetch(URLForTVSeries, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};

export const getSimilarTV = async (
  id: number,
  page: number
): Promise<Movie[]> => {
  const URLForSimilarTV = `https://api.themoviedb.org/3/tv/${id}/similar?language=en-US&page=${page}`;
  try {
    const response = await fetch(URLForSimilarTV, Getoptions);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log("similar tv: ", data.results);
    return data.results;
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to fetch movies: ${error.message}`);
    } else {
      throw console.log("Unknown Error");
    }
  }
};
