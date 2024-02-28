import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { Traffic, Location, Coordinate } from "@/types/types"; // Adjust the import path as necessary
import { Prisma } from "@/lib/prisma";
import { DOMAIN } from "@/lib/constants";

import {
  TrafficService,
  TodaysTrafficService,
  TrafficLogger,
  LinkTrafficLogger,
} from "@/lib/TrafficService";

interface IReqData {
  slug: string;
  ip: string;
  referrer: string;
  browser: string;
  device: string;
}
export async function POST(req: NextRequest) {
  const requestData = await req.json();

  if (
    typeof requestData !== "object" ||
    requestData === null ||
    !("slug" in requestData)
  )
    return new Response("Invalid request data", { status: 400 });

  const { slug, referrer, browser, device }: IReqData = requestData;
  const linkRecord = await Prisma.getInstance().link.findFirst({
    where: {
      shortURL: slug
    },
    select: {
      originalURL: true,
      id: true,
    },
  });

  if (!linkRecord) return new Response("Link not found", { status: 404 });

  await LinkTrafficLogger.recordTraffic(linkRecord.id, req)

  await incrementLinkClicks(slug).catch((err) => {
    throw new Error("Error Incrementing Link Count", err);
  });

  return new NextResponse(JSON.stringify({ url: linkRecord.originalURL }), {
    status: 200,
  });
}

async function incrementLinkClicks(slug: string) {
  await Prisma.getInstance().link.update({
    where: {
      shortURL: slug,
    },
    data: { clicks: { increment: 1 } },
  });
}
