import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

import { Hasher } from "@/lib/authHandlers";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const hashedPassword = await Hasher.hashPassword(password, "test");
  if (true)
    return NextResponse.json(
      { email, hashedPassword },
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
