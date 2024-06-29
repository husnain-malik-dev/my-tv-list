  import { CreatePostCard } from "@/components/CreatePost";
  import { Button } from "@/components/ui/button";
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
import prisma from "../db/prisma";  
import Link from "next/link";

 async function ForumPage() {

  const posts = await prisma.post.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      user: true, 
    },
  });

    return (
      <div className="mt-24 mb-40 flex justify-center items-center flex-col px-4 sm:px-12 md:px-24 lg:px-44">
        <CreatePostCard />
        <Table className="mt-4">
          <TableCaption>Talk about any TV/Movie in the forum Discussion.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[15%] font-semibold">Posted By :</TableHead>
              <TableHead className="w-[85%] font-semibold">Receny Forums Discussions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell className="font-semibold">u / <Link href={`/my-list/${post.user?.userName}`}>{post.user?.userName || "Unknown"}</Link></TableCell>
                <TableCell className="line-clamp-1 font-bold"><Link href={`/forums/${post.id}`}>{post.title}</Link></TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-20 text-2xl sm:text-3xl md:text-4xl font-semibold">
                No posts available.
              </TableCell>
            </TableRow>
          )}
          </TableBody>
        </Table>
      </div>
    );
  }

  export default ForumPage;
