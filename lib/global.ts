import fetch from 'node-fetch';


export const URLForMovieList =
"https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

export const URLForMovieGenre = "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc";

export const URLForGenreList = "https://api.themoviedb.org/3/genre/movie/list?language=en"


export const Getoptions = {
method: "GET",
headers: {
    accept: "application/json",
    Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDk1ODFlNWQ1ZGZjNTc5NjBlYzhkMWY5YTVmNzQ0MyIsIm5iZiI6MTcyNDU1NzcwMi44NzcwNzQsInN1YiI6IjY2YzgyZmI1OGZlZDdjY2Q3NGMzY2MxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Ied4arbplyzEc_U18Y4APreGJlgy6jyheo0WEY1IWBg",
},
};

