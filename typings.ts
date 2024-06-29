export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title?: string; // Movie specific
  original_name?: string;  // TV show specific
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string; // Movie specific
  first_air_date?: string; // TV show specific
  title?: string; // Movie specific
  name?: string; // TV show specific
  video?: boolean;
  vote_average: number;
  vote_count: number;
}


export type SearchResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
};

export type Genre = {
  id: number;
  name: string;
};

export type Genres = {
  genres: Genre[];
};
