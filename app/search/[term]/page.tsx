import {
    getSearchedMulti,
} from "@/lib/getMovies";
  import Image from "next/image";
  import Link from "next/link";
  import { notFound } from "next/navigation";
  import getImagePath from "@/lib/getImagePath";

  type Props = {
    params: {
      term: string;
    };
  };


  async function SearchPage({ params: { term } }: Props) {
    if (!term) notFound();

    const termToUse = decodeURI(term);

    const movies = await getSearchedMulti(termToUse);
    

    return (
      <div className="mx-10">
        <div className="flex flex-col space-y-5 mt-32 xl:mt-42">
          <h1 className="text-xl font-semibold line-clamp-1">Results for {termToUse}....</h1>

          <div className="flex items-center justify-center pb-24 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {movies.map((movie) => (
                <Link key={movie.id} href={`/title/${movie.name ? 'tv' : 'movie'}/${(movie.name ?? movie.title)?.split(" ").join("_")}/${movie.id}`} className="">
                  <div className="relative">
                    <Image
                      className="min-w-64 max-w-64 h-96 object-cover rounded-lg shadow-lg"
                      src={getImagePath(
                        movie.backdrop_path || movie.poster_path,
                        true
                      )}
                      alt="movie-poster"
                      width={300}
                      height={400}
                    />
                  </div>

                  <div className="py-2">
                    <p className="text-lg font-semibold line-clamp-1 w-64">
                      {movie?.title || movie?.name}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* <MoviesCarousel
            title=""
            movies={movies}
            isVertical
            showToggle={false}
            className="md:mr-60 lg:mr-[500px] xl:mr-[700px]"
          /> */}
        </div>
      </div>
    );
  }

  export default SearchPage;
