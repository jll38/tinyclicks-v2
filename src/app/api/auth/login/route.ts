import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";
import { Hasher } from "@/lib/authHandlers";

const jwt = require("jwt");

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if (!email)
      return NextResponse.json(
        { message: "Missing required field: Email" },
        { status: 400 }
      );
    if (!password)
      return NextResponse.json(
        { message: "Missing required field: Password" },
        { status: 400 }
      );
    const accessToken = await authenticateUser(email, password);

    return NextResponse.json({ accessToken }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500 }
    );
  }
}

async function authenticateUser(email: string, password: string): Promise<any> {
  const user = await Prisma.getInstance().user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw { message: "User not found!", status: 404 };
  }

  const isPasswordValid =
    (await Hasher.hashPassword(password, user.salt)) === user.password;

  if (!isPasswordValid) {
    throw { message: "Invalid credentials!", status: 401 };
  }

  return jwt.sign(user.name, process.env.JWT_ACCESS_TOKEN_SECRET);
}
