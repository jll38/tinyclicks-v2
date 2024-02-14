import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  let userId = req.nextUrl.searchParams.get("usr");
  const operation = req.nextUrl.searchParams.get("operation");
  console.log(operation);
  if (userId?.length === 0) userId = null;

  let data;

  switch (operation) {
    case "top-performers":
      data = await retrieveTopPerformers(userId);
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
      clicks: 'desc',
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
