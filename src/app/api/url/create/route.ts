import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

import { Shortener } from "../../../../lib/Shortener";

export async function POST(req: NextRequest) {
  const { userID, originalURL, locked } = await req.json();
  
  const shortURL = Shortener.shorten(originalURL);

  return NextResponse.json(
    { shortURL},
    {
      status: 200,
    }
  );
}
