import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";
import { Hasher } from "@/lib/authHandlers";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    if(!email) return NextResponse.json({ message: "Missing required field: Email"}, {status: 400})
    if(!password) return NextResponse.json({ message: "Missing required field: Password"}, {status: 400})
    await authenticateUser(email, password);

    //On Successful Authentication, do ____

    return NextResponse.json({ message: "Authentication successful" }, { status: 200 });
  } catch (error : any) {
    return NextResponse.json({ message: error.message }, { status: error.status || 500 });
  }
}

async function authenticateUser(email: string, password: string): Promise<void> {
  const user = await Prisma.getInstance().user.findUnique({
    where: { email: email },
  });

  if (!user) {
    throw { message: "User not found!", status: 404 }; 
  }

  const isPasswordValid = (await Hasher.hashPassword(password, user.salt)) === user.password;

  if (!isPasswordValid) {
    throw { message: "Invalid credentials!", status: 401 };
  }
}
