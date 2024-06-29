import React from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { addCommentAction } from "@/app/actions";

type commentProps = {
  postId: string;
};

async function AddComment({ postId }: commentProps) {
  const user = await currentUser();
  const username = user?.username;

  return (
    <Card className="px-4 py-2 flex items-center gap-x-4 w-[100%]">
      <Link href={`/my-list/${username}`}>
        <div className="flex flex-col w-[100px]">
          <span>post as: </span>
          <span>u/ {username}</span>
        </div>
      </Link>


      <form action={addCommentAction} className="w-full flex gap-4">
        <Input placeholder="Write a comment" name="text" />
        <Button variant={"outline"}>Post</Button>
        <input type="hidden" name="username" value={username as string} />
        <input type="hidden" name="postId" value={postId} />
      </form>

    </Card>
  );
}

export default AddComment;
