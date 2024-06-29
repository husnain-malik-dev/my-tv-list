"use server";

import { revalidatePath, unstable_noStore } from "next/cache";
import prisma from "./db/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from 'next/navigation'
import { JSONContent } from "@tiptap/react";


export const handleAddToListAction = async (formData: FormData) => {

  const userId = formData.get('userId') as string;
  const mediaType = formData.get('mediaType') as string;
  const showId = formData.get('showId') as string;
  const showRating = parseInt(formData.get('showRating') as string, 10);

  const existingRating = await prisma.userlist.findUnique({
    where: {
      userId_mediaType_showId: {
        userId,
        mediaType,
        showId,
      },
    },
  });

  if (existingRating) {
    // Update the existing rating
    await prisma.userlist.update({
      where: {
        userId_mediaType_showId: {
          userId,
          mediaType,
          showId,
        },
      },
      data: {
        showRating,
      },
    });
  } else {
    // Create a new rating
    await prisma.userlist.create({
      data: {
        userId,
        mediaType,
        showId,
        showRating,
      },
    });
  }

  const user = await currentUser();
  const username = user?.username;

  revalidatePath(`/my-list/${username}`)
};

export const handleDeleteFromListAction = async (formData: FormData) => {


  const user = await currentUser();
  const username = user?.username;

  const userId = formData.get('userId') as string;
  const mediaType = formData.get('mediaType') as string;
  const showId = formData.get('showId') as string;

  await prisma.userlist.delete({
    where: {
      userId_mediaType_showId: {
        userId,
        mediaType,
        showId,
      },
    },
  });

  revalidatePath(`/my-list/${username}`); 
  redirect(`/my-list/${username}`)
};

export async function createPost(
  { jsonContent }: { jsonContent: JSONContent | null },
  formData: FormData
) {
 
  const user = await currentUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const title = formData.get("title") as string;
  const imageUrl = formData.get("imageUrl") as string | null;

  const data = await prisma.post.create({
    data: {
      title: title,
      imageString: imageUrl ?? undefined,
      userId: user.id,
      textContent: jsonContent ?? undefined,
    },
  });

  return redirect("/forums");
}

export const addCommentAction = async (formData: FormData) => {
  const text = formData.get("text") as string;
  const c_username = formData.get("username") as string;
  const postId = formData.get("postId") as string;

  if (!text || !c_username || !postId) {
    throw new Error("Missing required fields");
  }

  await prisma.comment.create({
    data: {
      text,
      c_username,
      postId,
    },
  });

  revalidatePath(`/forums/${postId}`);
  redirect(`/forums/${postId}`);
};