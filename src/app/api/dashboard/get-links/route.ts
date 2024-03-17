import { Prisma } from "../../../../lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

async function retrieveUserLinks(userId: string) {
  return await Prisma.getInstance().link.findMany({
    where: {
      userId,
    },
    orderBy: {
        createdAt: "desc"
    }
  });
}

async function retrieveUserCollections(userId: string) {
    return await Prisma.getInstance().collection.findMany({
      where: {
        userId,
      },
      orderBy: {
          createdAt: "desc"
      }
    });
  }
export async function GET(req: NextRequest) {
    console.log("GET")
  let userId = req.nextUrl.searchParams.get("usr");
  if (userId === null)
    return NextResponse.json({ error: "No user specified" }, { status: 401 });

  let data;
  const userLinks = await retrieveUserLinks(userId);
  const userCollections = await retrieveUserCollections(userId);
  data = { 
    userLinks,
    userCollections
  }
  console.log(data);
  return NextResponse.json(
    { data },
    {
      status: 200,
    }
  );
}
