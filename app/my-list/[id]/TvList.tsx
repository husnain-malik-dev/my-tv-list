import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { getShowById } from "@/lib/getMovies";
import getImagePath from "@/lib/getImagePath";
import Link from "next/link";
import { Trash } from "lucide-react";
import { handleDeleteFromListAction } from "@/app/actions";
import Image from "next/image";
import { ShowDetails } from "@/typings";

type TvListProps = {
  mediaType: string;
  showId: string;
  i: number;
  showRating: number;
  userId: string;
  viewerId: string;
};

async function TvList({
  mediaType,
  showId,
  i,
  showRating,
  userId,
  viewerId,
}: TvListProps) {
  const data: ShowDetails = await getShowById(mediaType, showId);

  const typeOfMedia = mediaType.toUpperCase();

  return (
    <TableRow>
      <TableCell className="font-medium">{i}</TableCell>
      <TableCell>
        <img
          src={getImagePath(data?.poster_path, true)}
          className="w-[100px] h-[100px] object-cover"
          alt="img"
        />
      </TableCell>
      <TableCell>
        <Link
          href={`/title/${data?.name ? "tv" : "movie"}/${(
            data?.name ?? data?.title
          )
            ?.split(" ")
            .join("_")}/${data?.id}`}
        >
          <span>{data?.title || data?.name}</span>
        </Link>
      </TableCell>
      <TableCell className="sm:text-lg md:text-xl font-semibold">
        {showRating}
      </TableCell>
      <TableCell className="hidden sm:flex items-center mt-10">
        {typeOfMedia}
      </TableCell>
      <TableCell>
        {data?.number_of_episodes ? `${data?.number_of_episodes}` : `${1}`}
      </TableCell>
      {viewerId === userId && (
        <TableCell className="cursor-pointer">
          <form action={handleDeleteFromListAction}>
            <input type="hidden" name="userId" value={userId} />
            <input type="hidden" name="mediaType" value={mediaType} />
            <input type="hidden" name="showId" value={showId} />
            <button type="submit">
              <Trash />
            </button>
          </form>
        </TableCell>
      )}
    </TableRow>
  );
}

export default TvList;
