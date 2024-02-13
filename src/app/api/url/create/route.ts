import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";
import { Traffic } from "../../../../types/types";
import { Shortener } from "../../../../lib/Shortener";

export async function GET(req: NextRequest) {
  const shortURL = Shortener.shorten("www.example.com");
  return NextResponse.json(
    { message: shortURL },
    {
      status: 200,
    }
  );
}
