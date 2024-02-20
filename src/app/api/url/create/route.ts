import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

import { Shortener } from "../../../../lib/Shortener";

export async function POST(req: NextRequest) {
  const { userID, originalURL, locked } = await req.json();

  const shortURL = await ensureUnique(Shortener.shorten(originalURL));
  console.log(shortURL);
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
        shortURL,
        protected: locked,
      },
    });
    return true;
  } catch (err) {
    console.error("Error: " + err);
    return false;
  }
}

async function ensureUnique(
  shortURL: string,
  attempt: number = 0
): Promise<string> {
  const maxAttempts = 10; // Maximum number of attempts to generate a unique URL
  if (attempt >= maxAttempts) {
    throw new Error("Maximum attempts to generate a unique URL exceeded.");
  }

  if (!(await doesExist(shortURL))) {
    return shortURL;
  } else {
    const uniqueSuffix =
      Date.now().toString(36) + Math.random().toString(36).substr(2, 3);
    const newShortURL = shortURL + uniqueSuffix;
    return ensureUnique(newShortURL, attempt + 1); // Increment the attempt count
  }
}

async function doesExist(shortURL: string): Promise<boolean> {
  const record = await Prisma.getInstance().link.findFirst({
    where: {
      shortURL,
    },
  });
  return record !== null;
}
