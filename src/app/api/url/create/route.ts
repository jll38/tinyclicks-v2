import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

import { Shortener } from "../../../../lib/Shortener";

export async function POST(req: NextRequest) {

  const shortURL = Shortener.shorten("www.example.com");

  return NextResponse.json(
    { message: shortURL },
    {
      status: 200,
    }
  );
}
