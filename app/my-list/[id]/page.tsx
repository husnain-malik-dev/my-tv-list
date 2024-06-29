import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import getImagePath from "@/lib/getImagePath";
import TvList from "./TvList";
import { currentUser } from "@clerk/nextjs/server";
import prisma from "../../db/prisma";

async function Page({ params }: { params: { id: string } }) {
  const viewer = await currentUser();
  const viewerId = viewer?.id || "";

  // Fetch the user whose list is being viewed
  const user = await prisma.user.findUnique({
    where: { userName: params.id },
  });

  if (!user) {
    return <div className="my-60 flex justify-center items-center font-semibold text-3xl sm:text-4xl">User Does Not Exist!</div>;
  }

  const userId = user.id;

  const userLists = await prisma.userlist.findMany({
    where: { userId },
  });

  return (
    <div className="my-28 mx-6 sm:mx-12 md:mx-24 lg:mx-40 flex justify-center items-center">
      <Table>
        <TableCaption>A list of {params.id}'s TV/Movies.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[1px] sm:w-[100px] sm:text-base">#</TableHead>
            <TableHead className="sm:text-base">Image</TableHead>
            <TableHead className="sm:text-base">Title</TableHead>
            <TableHead className="sm:text-base">Score</TableHead>
            <TableHead className="sm:text-base hidden sm:flex items-center">Type</TableHead>
            <TableHead className="sm:text-base">Episodes</TableHead>
            {viewerId === userId && <TableHead className="sm:text-base"></TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {userLists.length > 0 ? (
            userLists.map((userList, index) => (
              <TvList
                key={userList.id}
                userId={userList.userId}
                mediaType={userList.mediaType}
                showId={userList.showId}
                i={index + 1}
                showRating={userList.showRating}
                viewerId={viewerId}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-20 text-2xl sm:text-3xl md:text-4xl font-semibold">
                No Shows Added in the List!
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default Page;
