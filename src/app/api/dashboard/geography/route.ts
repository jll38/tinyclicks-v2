import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";
import {
  TrafficService,
  TodaysTrafficService,
  TrafficLogger,
} from "@/lib/TrafficService";

export async function GET(req: NextRequest) {
  let userId = req.nextUrl.searchParams.get("usr");
  console.log(userId);
  if (!userId) return new Error("User not found");
  let data = await TrafficService._queryAllTrafficData(userId);
  return NextResponse.json(data, {
    status: 200,
  });
}
