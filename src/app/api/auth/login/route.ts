import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  if (true)
    return NextResponse.json(
      { email, password },
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
