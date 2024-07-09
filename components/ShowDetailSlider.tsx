"use client";
import React, { useEffect, useState } from "react";
import ShowDetailCard from "./ShowDetailCard";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import { Movie } from "@/typings";

interface ShowDetailSliderProps {
  title: string;
  movies: any;
  rowID: number;
  likeBtn: boolean;
}

const ShowDetailSlider = ({ title, movies, rowID, likeBtn }: ShowDetailSliderProps) => {
  const slideLeft = () => {
    var slider = document.getElementById("slider" + rowID);
    if (slider) {
      slider.scrollLeft = slider.scrollLeft - 500;
    }
  };
  const slideRight = () => {
    var slider = document.getElementById("slider" + rowID);
    if (slider) {
      slider.scrollLeft = slider.scrollLeft + 500;
    }
  };



  return (
    <>
      <h2 className="text-white font-bold text-base sm:text-xl md:text-2xl py-2">
        {title}
      </h2>
      <div className="relative flex items-center group">
        <MdChevronLeft
          onClick={slideLeft}
          className=" left-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
        <div
          id={"slider" + rowID}
          className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative"
        >
          {movies.map((item : any, id : number) => (
                <ShowDetailCard key={id} item={item} likeBtn={likeBtn} />
          ))}
        </div>
        <MdChevronRight
          onClick={slideRight}
          className="right-0 rounded-full absolute opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block"
          size={40}
        />
      </div>
    </>
  );
};

export default ShowDetailSlider;


