import prisma from "@/app/db/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { unstable_noStore as noStore } from "next/cache";

export async function GET() {
  noStore();

  const { userId } = auth();
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const user = await currentUser();
  if (!user) {
    return new NextResponse('User not exist', { status: 404 });
  }

  // Extract user details safely, providing defaults where necessary
  const email = user.emailAddresses?.[0]?.emailAddress || '';
  const imageUrl = user.imageUrl || '';
  const userName = user.username || '';

  let dbUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (!dbUser) {
    await prisma.user.create({
      data: {
        id: user.id,
        email,
        imageUrl,
        userName,
      },
    });
  }

  return NextResponse.redirect(
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/"
      : "http://your-production-url.com/"
  );
}
