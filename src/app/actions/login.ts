"use server";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/login.schema";
export async function loginact(data: LoginSchema) {
  const email = data.email as string;
  const password = data.password as string;
  if (!email || !password) {
    return { error: "Email and password required" };
  }
  const user = await prisma.users.findUnique({
    where: { email },
  });

  if (!user) {
    return { error: "Invalid email" };
  }

  if (user.password !== password) {
    return { error: "Invalid password" };
  }

  return { success: true };
}
