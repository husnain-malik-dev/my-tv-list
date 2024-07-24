import { SearchResults, ShowDetails, ShowCredits } from "@/typings";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("include_video", "false");
  url.searchParams.set("sort_by", "popularity.desc");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);
  const data = await response.json();
  return data;
}

export async function getDiscoverMovies(id?: string, keywords?: string) {
  const url = new URL(`https://api.themoviedb.org/3/discover/movie`);

  keywords && url.searchParams.set("with_keywords", keywords);
  id && url.searchParams.set("with_genres", id);

  const data = await fetchFromTMDB(url) as SearchResults;
  return data.results;
}

export async function getSearchedMovies(term: string) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");

  url.searchParams.set("query", term);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as SearchResults;

  return data.results;
}

export async function getSearchedMulti(term: string) {
  const url = new URL("https://api.themoviedb.org/3/search/multi");

  url.searchParams.set("query", term);
  url.searchParams.set("include_adult", "false");
  url.searchParams.set("language", "en-US");
  url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: 60 * 60 * 24,
    },
  };

  const response = await fetch(url.toString(), options);
  const data = (await response.json()) as SearchResults;

  return data.results;
}

export async function getUpcomingMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getTrendingMovies() {
  const url = new URL("https://api.themoviedb.org/3/trending/movie/week");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getTopRatedMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getPopularMovies() {
  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getTrendingTv() {
  const url = new URL("https://api.themoviedb.org/3/trending/tv/week");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getTopRatedTv() {
  const url = new URL("https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getPopularTv() {
  const url = new URL("https://api.themoviedb.org/3/tv/popular?language=en-US&page=1");
  const data = await fetchFromTMDB(url);

  return data.results;
}

export async function getShowById(mediaType: string, externalId: string): Promise<ShowDetails> {
  const url = new URL(`https://api.themoviedb.org/3/${mediaType}/${externalId}`);
  const data = await fetchFromTMDB(url);
  return data;
}

export async function getShowCredits(mediaType: string, externalId: string): Promise<ShowCredits> {
  const url = new URL(`https://api.themoviedb.org/3/${mediaType}/${externalId}/credits`);
  const data = await fetchFromTMDB(url);
  return data;
}

export async function getSimilarShows(mediaType: string, externalId: string): Promise<SearchResults> {
  const url = new URL(`https://api.themoviedb.org/3/${mediaType}/${externalId}/similar`);
  const data = await fetchFromTMDB(url);
  return data;
}

export async function getRecommendations(mediaType: string, externalId: string): Promise<SearchResults> {
  const url = new URL(`https://api.themoviedb.org/3/${mediaType}/${externalId}/recommendations`);
  const data = await fetchFromTMDB(url);
  return data;
}
