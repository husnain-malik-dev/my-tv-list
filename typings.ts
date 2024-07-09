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


export interface Season {
  season_number: number;
  air_date?: string;
}

export interface Crew {
  job: string;
  name: string;
}

export interface Cast {
  id: number;
  name: string;
  character: string;
  profile_path: string;
}

export interface ShowCredits {
  crew: Crew[];
  cast: Cast[];
}

export interface ShowDetails {
  id: number;
  title?: string;
  name?: string;
  tagline?: string;
  vote_average: number;
  vote_count: number;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  status: string;
  runtime?: number;
  number_of_episodes?: number;
  release_date?: string;
  seasons?: Season[];
  genres: Genre[];
  created_by?: Crew[];
}