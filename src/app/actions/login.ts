"use server";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/login.schema";
import { verifyPassword } from "@/lib/password";

export async function loginact(data: LoginSchema) {
  const { email, password } = data;

  if (!email || !password) {
    return { error: "Invalid email or password" };
  }

  const user = await prisma.users.findUnique({
    where: { email: email.toLocaleLowerCase() },
  });

  if (!user) {
    return { error: "Invalid email or password" };
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return { error: "Invalid email or password" };
  }

  return { success: true };
}
