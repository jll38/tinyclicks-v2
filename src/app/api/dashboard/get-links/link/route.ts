import { Prisma } from "../../../../../lib/Prisma";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  console.log("GET");
  let userId = req.nextUrl.searchParams.get("usr");
  let linkId = req.nextUrl.searchParams.get("link");
  if (userId === null)
    return NextResponse.json({ error: "No user specified" }, { status: 401 });
  if (linkId === null)
    return NextResponse.json({ error: "No link specified" }, { status: 401 });

  console.log(linkId);
  let data = {linkId};

  console.log(data);
  return NextResponse.json(data, {
    status: 200,
  });
}
