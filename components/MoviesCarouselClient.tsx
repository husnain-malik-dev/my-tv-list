"use client";

import { useState } from "react";
import MoviesCarousel from "./MoviesCarousel";
import { Movie } from "@/typings";

type MoviesCarouselClientProps = {
  trendingMovies: Movie[];
  topRatedMovies: Movie[];
  popularMovies: Movie[];
  trendingTv: Movie[];
  topRatedTv: Movie[];
  popularTv: Movie[];
};

const MoviesCarouselClient = ({
  trendingMovies,
  topRatedMovies,
  popularMovies,
  trendingTv,
  topRatedTv,
  popularTv,
}: MoviesCarouselClientProps) => {
  // Initialize states for each carousel
  const [carouselStates, setCarouselStates] = useState([true, true, true]);

  // Handler to toggle individual carousels
  const handleToggle = (index: number) => {
    setCarouselStates((prev) => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <>
      <MoviesCarousel
        movies={carouselStates[0] ? trendingMovies : trendingTv}
        title={carouselStates[0] ? "Trending Movies" : "Trending TV"}
        onToggle={() => handleToggle(0)}
        isMovie={carouselStates[0]}
      />
      <MoviesCarousel
        movies={carouselStates[1] ? topRatedMovies : topRatedTv}
        title={carouselStates[1] ? "Top Rated Movies" : "Top Rated TV"}
        onToggle={() => handleToggle(1)}
        isMovie={carouselStates[1]}
      />
      <MoviesCarousel
        movies={carouselStates[2] ? popularMovies : popularTv}
        title={carouselStates[2] ? "Popular Movies" : "Popular TV"}
        onToggle={() => handleToggle(2)}
        isMovie={carouselStates[2]}
      />
    </>
  );
};

export default MoviesCarouselClient;
