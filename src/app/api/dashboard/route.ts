import { Prisma } from "../../../lib/Prisma";
import { NextResponse, NextRequest } from "next/server";
import {
  TrafficService,
  TodaysTrafficService,
  TrafficLogger,
} from "@/lib/TrafficService";

export async function GET(req: NextRequest) {
  let userId = req.nextUrl.searchParams.get("usr");
  if (userId === null)
    return NextResponse.json({ error: "No user specified" }, { status: 401 });
  const operation = req.nextUrl.searchParams.get("operation");
  const timeZone = req.nextUrl.searchParams.get("timeZone");
  if (timeZone === null)
    return NextResponse.json(
      { error: "No time zone specified" },
      { status: 401 }
    );

  let data;

  switch (operation) {
    case "top-performers":
      data = await retrieveTopPerformers(userId);
      break;
    case "todays-clicks":
      data = await getTodaysClicks(userId, timeZone);
      break;
    case "links":
      data = await retrieveLinks(userId);
      break;
  }


  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}

async function retrieveTopPerformers(userId: string | null) {
  return await Prisma.getInstance().link.findMany({
    where: {
      userId,
    },
    orderBy: {
      clicks: "desc",
    },
    take: 5,
  });
}
async function retrieveLinks(userId: string | null) {
  return await Prisma.getInstance().link.findMany({
    where: {
      userId,
    },
  });
}

async function getTodaysClicks(userId: string, timeZone: string) {
  return await TodaysTrafficService.getClicksCount(userId, timeZone);
}
