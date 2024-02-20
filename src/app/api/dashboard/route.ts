import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  let userId = req.nextUrl.searchParams.get("usr");
  const operation = req.nextUrl.searchParams.get("operation");
  const timeZone = req.nextUrl.searchParams.get("timeZone");

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

async function getTodaysClicks(userId: string | null, timeZone: string | null) {
  const moment = require("moment-timezone");
  const midnightUserTime = moment().tz(timeZone).startOf("day");
  const midnightUTC = midnightUserTime.clone().tz("UTC").format();


  const UsersTraffic = await Prisma.getInstance().user.findMany({
    select: {
      id: true, 
      name: true,
      links: {
        select: {
          id: true, 
          traffic: {
            select: {
              id: true, 
              createdAt: true,
            },
            where: {
              createdAt: {
                gte: midnightUTC,
              },
            },
          },
        },
      },
    },
  });

  let todaysClicks = 0;
  UsersTraffic.map((user) => {
    user.links.map((link) => {
      todaysClicks += link.traffic.length;
    });
  });
  return {todaysClicks};
}
