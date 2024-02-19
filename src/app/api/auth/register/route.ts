import { Prisma } from "@/lib/Prisma";
import { NextResponse, NextRequest } from "next/server";
import { Hasher } from "@/lib/authHandlers";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();
    if (!name)
      return NextResponse.json(
        { message: "Missing required field: Name" },
        { status: 400 }
      );
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
      
    await createUser(name, email, password);

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status || 500 }
    );
  }
}

async function createUser(
  name: string,
  email: string,
  password: string
): Promise<void> {
  try {
    const salt = await Hasher.generateSalt();
    const hashedPassword = await Hasher.hashPassword(password, salt);
    await Prisma.getInstance().user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        salt,
      },
    });
  } catch (error) {
    throw { message: "Error registering user, please try again later." };
  }
}
