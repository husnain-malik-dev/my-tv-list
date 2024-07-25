import React from 'react'
import prisma from "@/app/db/prisma";
import { format } from 'date-fns';
import { FC } from 'react';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


type commentProps = {
    postId: string;
  };

async function ShowComments({postId} : commentProps) {

  const comments = await prisma.comment.findMany({
    where: { postId },
    include: { user: true },
  });

  return (
    <div className='mt-8 '>
      {comments.length > 0 ?? (
          <h2 className='text-2xl font-bold'>Comments</h2>
      )}
      <ul className=''>
        {comments.map((comment, i) => (
          <li key={comment.id} className='mb-4  p-2 border-4 my-4'>
            <div className='flex items-center mb-2 justify-between'>
              <div className='flex items-center gap-2'>
              <Avatar>
                <AvatarImage src={comment.user?.imageUrl || undefined} className='object-cover'  />
                <AvatarFallback>:(</AvatarFallback>
              </Avatar>
              <div className='text-blue-500 font-bold mr-2'>
                <Link href={`/my-list/${comment.user?.userName}`}>
                {comment.user?.userName}
                </Link>
              </div>
              <div className='text-gray-500'>
              {format(new Date(comment.createdAt), "MMMM d, yyyy h:mm a")}
              </div>
              </div>
              <div className=''># {i+1}</div>
            </div>
            <p>{comment.text}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShowComments