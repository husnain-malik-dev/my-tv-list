"use client";

import { useEffect } from "react";
import { Movie } from "@/typings";
import MovieCard from "./MovieCard";
import { Switch } from "@/components/ui/switch";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import clsx from 'clsx';

type Props = {
  title?: string;
  movies: Movie[];
  isVertical?: boolean;
  onToggle?: () => void;
  isMovie?: boolean;
  showToggle?: boolean;
  movieToggle?: boolean;
  className?: string;
};

function MoviesCarousel({
  title,
  movies,
  isVertical = false,
  onToggle,
  isMovie,
  showToggle = true,
  movieToggle = true,
  className,
}: Props) {
  const [emblaRef, embla] = useEmblaCarousel({
    loop: false,
    align: 'start',
    dragFree: true,
    // direction: isVertical ? 'vertical' : 'horizontal',
  });

  useEffect(() => {
    if (embla) {
     
    }
  }, [embla]);

  return (
    <div className={clsx("z-50 mt-10", className)}>
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold py-4">{title}</h2>
        {showToggle && (
          <div className="flex items-center gap-2">
            <span>{isMovie ? "Movie" : "TV"}</span>
            <Switch className="mr-10" checked={!isMovie} onCheckedChange={onToggle} />
          </div>
        )}
      </div>

      <div className={`embla ${isVertical ? 'embla--vertical' : ''}`} ref={emblaRef}>
        <div className={`embla__container ${isVertical ? 'embla__container--vertical' : ''}`}>
          {movies?.map((movie) => (
            <div key={movie.id} className={`embla__slide ${isVertical ? 'embla__slide--vertical' : ''}`}>
              <Link href={`/title/${movie.name ? 'tv' : 'movie'}/${(movie.name ?? movie.title)?.split(" ").join("_")}/${movie.id}`}>
                <MovieCard movie={movie} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MoviesCarousel;