import MoviesCarousel from "@/components/MoviesCarousel";
import { getPopularMovies, getPopularTv, getSearchedMulti } from "@/lib/getMovies";
import { notFound } from "next/navigation";

type Props = {
  params: {
    term: string;
  };
};

async function SearchPage({ params: { term } }: Props) {
  if (!term) notFound();

  const termToUse = decodeURI(term);

  const movies = await getSearchedMulti(termToUse);
  // const popularMovies = await getPopularMovies();
  // const popularTv = await getPopularTv();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
        <h1 className="text-6xl font-bold px-10">Results for {termToUse}</h1>
        
        <MoviesCarousel
          title=""
          movies={movies}
          isVertical
          showToggle={false}
          className="md:mr-60 lg:mr-[500px] xl:mr-[700px]"
        />
      </div>
    </div>
  );
}

export default SearchPage;
