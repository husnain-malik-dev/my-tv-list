import React from "react";
import ShowDetailSlider from "../../../components/ShowDetailSlider";
import AddToListBtn from "../../../components/AddToListBtn";
import {
  getShowById,
  getShowCredits,
  getSimilarShows,
  getRecommendations,
} from "@/lib/getMovies";
import getImagePath from "@/lib/getImagePath";
import { BookmarkPlus, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dayjs from "dayjs";
import { currentUser } from "@clerk/nextjs/server";
import { handleAddToListAction } from "@/app/actions";
import { ShowDetails, ShowCredits } from "../../../typings";
import prisma from "../../db/prisma";

async function Page({ params }: { params: { id: string } }) {
  const mediaType = params.id[0];
  const showId = params.id[2];

  const data: ShowDetails = await getShowById(mediaType, showId);
  const credits: ShowCredits = await getShowCredits(mediaType, showId);
  const similar = await getSimilarShows(mediaType, showId);
  const recommendations = await getRecommendations(mediaType, showId);

  const firstSeason = data?.seasons?.find(
    (season: any) => season.season_number === 1
  );
  const firstSeasonAirDate = firstSeason?.air_date || "Unknown";
  const director = credits.crew?.filter((f) => f.job === "Director");
  const writer = credits?.crew?.filter(
    (f) => f.job === "Screenplay" || f.job === "Story" || f.job === "Writer"
  );
  const toHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
  };

  const user = await currentUser();
  const userId = user?.id || "";

  const userRating = await prisma.userlist.findUnique({
    where: {
      userId_mediaType_showId: {
        userId,
        mediaType,
        showId,
      },
    },
  });

  return (
    <>
      <div className="mb-20 ml-4 sm:ml-7 sm:mr-4">
        <div className="relative">
          <div className="sm:h-[300px]">
            <img
              src={getImagePath(data?.backdrop_path, true)}
              className="h-full w-full object-cover hidden sm:block"
              alt="Backdrop"
            />
          </div>
          <div className="flex sm:absolute sm:top-20">
            <div className="mt-28 w-[200px] sm:w-[300px]">
              <img
                src={getImagePath(data?.poster_path, true)}
                className="h-80 w-full object-cover rounded"
                alt="Poster"
              />
              <form action={handleAddToListAction}>
                <input type="hidden" name="userId" value={userId} />
                <input type="hidden" name="mediaType" value={mediaType} />
                <input type="hidden" name="showId" value={showId} />
                <AddToListBtn />
                <div className="mt-2 w-full gap-1 rounded-xl">
                  <Select
                    name="showRating"
                    defaultValue={userRating?.showRating?.toString() || ""}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">(1) Appalling</SelectItem>
                      <SelectItem value="2">(2) Horrible</SelectItem>
                      <SelectItem value="3">(3) Very Bad</SelectItem>
                      <SelectItem value="4">(4) Bad</SelectItem>
                      <SelectItem value="5">(5) Average</SelectItem>
                      <SelectItem value="6">(6) Fine</SelectItem>
                      <SelectItem value="7">(7) Good</SelectItem>
                      <SelectItem value="8">(8) Very Good</SelectItem>
                      <SelectItem value="9">(9) Great</SelectItem>
                      <SelectItem value="10">(10) Masterpiece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </form>
            </div>
            <div className="mt-28 ml-4 flex flex-col gap-3 sm:mt-56 flex-1">
              <h1 className="text-2xl font-bold">
                {data?.title || data?.name}
              </h1>
              <p className="text-neutral-400">{data?.tagline}</p>
              <div className="flex flex-row gap-2 items-center">
                <Star />
                <span className="text-xl sm:text-2xl font-bold">
                  {data?.vote_average}
                </span>
                <span className="text-xl">({data?.vote_count}) views</span>
              </div>
              <span>{data?.overview}</span>
            </div>
          </div>
        </div>

        <div className="divide-y-4 gap-4 flex flex-col mt-4 mr-2 sm:mt-96 md:mt-80">
          <div className="flex flex-row gap-4 sm:gap-10 md:gap-20 justify-between items-center md:justify-start">
            <span className="font-bold text-base sm:text-xl md:text-2xl">
              Status: {data?.status}
            </span>
            <span className="font-bold text-base sm:text-xl md:text-2xl">
              {data?.runtime
                ? `Runtime: ${toHoursAndMinutes(data?.runtime)}`
                : `Episodes: ${data?.number_of_episodes}`}
            </span>
            <span className="font-bold text-base sm:text-xl md:text-2xl">
              Released:{" "}
              {data?.release_date
                ? dayjs(data.release_date).format("MMM D, YYYY")
                : dayjs(firstSeasonAirDate).format("MMM D, YYYY")}
            </span>
          </div>
          <div className="flex-wrap">
            <span className="font-bold text-base sm:text-xl md:text-2xl">
              Genres:
            </span>{" "}
            {data?.genres.map((genre: any, i: number) => (
              <span key={genre.id} className="ml-2">
                {genre.name}
                {data?.genres.length - 1 !== i && ", "}
              </span>
            ))}
          </div>

          {director?.length > 0 && (
            <div className="">
              <span className="font-bold text-base sm:text-xl md:text-2xl">
                Director:{" "}
              </span>
              <span>
                {director?.map((d: any, i: number) => (
                  <span key={i} className="ml-2">
                    {d.name}
                    {director.length - 1 !== i && ", "}
                  </span>
                ))}
              </span>
            </div>
          )}

          {writer?.length > 0 && (
            <div>
              <span className="font-bold text-base sm:text-xl md:text-2xl">
                Writer:{" "}
              </span>
              <span>
                {writer?.map((d: any, i: number) => (
                  <span key={i} className="ml-2">
                    {d.name}
                    {writer.length - 1 !== i && ", "}
                  </span>
                ))}
              </span>
            </div>
          )}

          {(data?.created_by?.length ?? 0) > 0 && (
            <div>
              <span className="font-bold text-base sm:text-xl md:text-2xl">
                Creator:{" "}
              </span>
              <span className="text">
                {data?.created_by?.map((d, i) => (
                  <span key={i} className="ml-2">
                    {d.name}
                    {(data?.created_by?.length ?? 0) - 1 !== i && ", "}
                  </span>
                ))}
              </span>
            </div>
          )}
        </div>

        <div className="mt-8">
          <ShowDetailSlider
            rowID={1}
            title={"Top Cast"}
            movies={credits?.cast}
            likeBtn={true}
          />
          <ShowDetailSlider
            rowID={2}
            title={"Similar"}
            movies={similar.results}
            likeBtn={false}
          />
          <ShowDetailSlider
            rowID={3}
            title={"Recommendation"}
            movies={recommendations.results}
            likeBtn={false}
          />
        </div>
      </div>
    </>
  );
}

export default Page;
