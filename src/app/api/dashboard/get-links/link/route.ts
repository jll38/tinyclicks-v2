import { Prisma } from "../../../../../lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

import { TrafficService } from "@/lib/TrafficService";

export async function GET(req: NextRequest) {
  console.log("GET");
  let userId = req.nextUrl.searchParams.get("usr");
  let linkId = req.nextUrl.searchParams.get("link");
  if (userId === null)
    return NextResponse.json({ error: "No user specified" }, { status: 401 });
  if (linkId === null)
    return NextResponse.json({ error: "No link specified" }, { status: 401 });

  const trafficSources = await TrafficService._queryNumTrafficSourcesByLink({
    userId,
    linkId,
  });

  return NextResponse.json({trafficSources}, {
    status: 200,
  });
}
