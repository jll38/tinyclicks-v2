import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

import { Shortener } from "../../../../lib/Shortener";

export async function POST(req: NextRequest) {
  const { userID, originalURL, locked } = await req.json();

  const shortURL = Shortener.shorten(originalURL);

  if (await createUrlRecord(userID, originalURL, shortURL, locked))
    return NextResponse.json(
      { shortURL },
      {
        status: 200,
      }
    );
  return NextResponse.json(
    { message: "Error! Please try again later" },
    {
      status: 400,
    }
  );
}

async function createUrlRecord(
  userId: string | null,
  originalURL: string,
  shortURL: string,
  locked: boolean
): Promise<boolean> {
  try {
    await Prisma.getInstance().link.create({
      data: {
        userId,
        originalURL,
        shortURL: shortURL,
        protected: locked,
      },
    });
    return true;
  } catch (err) {
    console.error("Error: " + err);
    return false;
  }
}
