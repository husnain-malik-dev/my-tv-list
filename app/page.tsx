import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarouselClient from "@/components/MoviesCarouselClient";
import {
  getTrendingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingTv,
  getPopularTv,
  getTopRatedTv,
} from "@/lib/getMovies";

export default async function Home() {
  const trendingMovies = await getTrendingMovies();
  const topRatedMovies = await getTopRatedMovies();
  const popularMovies = await getPopularMovies();
  const trendingTv = await getTrendingTv();
  const popularTv = await getPopularTv();
  const topRatedTv = await getTopRatedTv();


  return (
    <main className="">
      <CarouselBannerWrapper />

      <div className="flex flex-col space-y-2 xl:-mt-48 ml-4 md:ml-8 lg:ml-12">
        <MoviesCarouselClient
          trendingMovies={trendingMovies}
          topRatedMovies={topRatedMovies}
          popularMovies={popularMovies}
          trendingTv={trendingTv}
          topRatedTv={topRatedTv}
          popularTv={popularTv}
        />
      </div>
    </main>
  );
}