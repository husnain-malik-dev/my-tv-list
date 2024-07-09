"use client";
import { useState } from "react";
import getImagePath from "@/lib/getImagePath";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const ShowDetailCard = ({ item, likeBtn }: any) => {
  const [like, setLike] = useState(false);

  const toggleLike = () => {
    setLike(!like);
  };

  return (
    <div className="w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2">
      <img
        className="w-full h-auto block"
        src={getImagePath(item.backdrop_path || item.profile_path, true)}
        alt={item?.title || item?.name}
      />
      <div className="absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white">
        <p className="white-space-normal text-xs md:text-sm font-bold flex justify-center items-center h-full text-center">
          <Link
            href={`/title/${item.name ? "tv" : "movie"}/${(
              item.name ?? item.title
            )
              ?.split(" ")
              .join("_")}/${item.id}`}
          >
            {item?.title || item?.character || item?.name}
          </Link>
        </p>
        {likeBtn && (
          <p onClick={toggleLike}>
            {like ? (
              <FaHeart className="absolute top-4 left-4 text-gray-300" />
            ) : (
              <FaRegHeart className="absolute top-4 left-4 text-gray-300" />
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowDetailCard;
