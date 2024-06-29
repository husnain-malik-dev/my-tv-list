import React from "react";
import { Card } from "@/components/ui/card";
import { RenderToJson } from "@/components/RenderToJson";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import prisma from "@/app/db/prisma";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import AddComment from "@/components/AddComment";
import ShowComments from "@/components/ShowComments";

const rules = [
  {
    id: 1,
    text: "Remember the human",
  },
  {
    id: 2,
    text: "Behave like you would in real life",
  },
  {
    id: 3,
    text: "Look for the original source of content",
  },
  {
    id: 4,
    text: "Search for duplication before posting",
  },
  {
    id: 5,
    text: "Read the community guidlines",
  },
];

async function page({ params }: { params: { id: string } }) {
  const postId = params.id;

  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: { user: true },
  });

  if (!post) {
    throw new Error("No post found");
  }

  return (
    <div className=" max-w-[1000px] mx-4 sm:mx-8 md:mx-16 lg:mx-24 gap-x-10 mt-24 mb-40">
      <div className="flex ">
        <div className="sm:w-[90%] md:w-[65%] flex flex-col border-4 rounded-md px-6 py-4 gap-4">
          <div className="flex items-center gap-2">
            <Link href={`/my-list/${post.user?.userName}`}>
              <Avatar>
                <AvatarImage src={post.user?.imageUrl || undefined} />
                <AvatarFallback>prof</AvatarFallback>
              </Avatar>
              <span className="font-semibold">
                posted by: u / {post.user?.userName}
              </span>
            </Link>
          </div>
          <h1 className="font-bold text-4xl">{post.title}</h1>
          <span className="text-sm">
            {post.textContent && <RenderToJson data={post.textContent} />}
          </span>
          {post.imageString && (
            <div className="mt-4">
              <Image
                src={post.imageString}
                alt="Post Image"
                width={800}
                height={200}
                className="rounded-md "
              />
            </div>
          )}
        </div>
        <div className="w-[35%] hidden md:block ml-10">
          <Card className="flex flex-col p-4">
            <div className="flex items-center gap-x-2">
              <h1 className="font-medium">Posting to MY TV LIST</h1>
            </div>
            <Separator className="mt-2" />

            <div className="flex flex-col gap-y-5 mt-5">
              {rules.map((item) => (
                <div key={item.id}>
                  <p className="text-sm font-medium">
                    {item.id}. {item.text}
                  </p>
                  <Separator className="mt-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
      <div className="mt-4">
        <ShowComments postId={params.id} />
        <AddComment postId={params.id} />
      </div>
    </div>
  );
}

export default page;
