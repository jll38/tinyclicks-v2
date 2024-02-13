import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

export function GET(req: NextRequest) {
  return NextResponse.json({ message: "Hello there!" }, {
    status: 200,
  });
}
