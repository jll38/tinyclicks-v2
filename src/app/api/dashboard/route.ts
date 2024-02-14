import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("usr");
    const links = await retrieveLinks(userId)
      return NextResponse.json(
        { links },
        {
          status: 200,
        }
      );
    
  }

async function retrieveLinks(userId : string | null){
    return await Prisma.getInstance().link.findMany({
        where: {
            userId
        }
    });
}