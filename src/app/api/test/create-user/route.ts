import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

export const runtime = "nodejs";

export async function POST() {
  const hashedPassword = await bcrypt.hash("123456", 10);

  const user = await prisma.user.create({
    data: {
      email: "teste@teste.com",
      password: hashedPassword,
      name: "Usuário Teste",
    },
  });

  return NextResponse.json(user);
}