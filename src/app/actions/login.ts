"use server";
import { prisma } from "@/lib/prisma";
import { LoginSchema } from "@/schemas/login.schema";
import { hashPassword } from "@/lib/password";

export async function loginact(data: LoginSchema) {
  const email = data.email as string;
  const password = data.password as string;
  if (!email || !password) {
    return { error: "Email and password required" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Unxpected email" };
  }
  if (!/^[A-Za-z0-9]+$/.test(password)) {
    return { error: "Password must contain only letters and numbers" };
  }
  if (password.length < 6 || password.length > 8) {
    return { error: "Inavlid password" };
  }
  //here both are good password and email no bad data
  const user = await prisma.users.findUnique({
    where: { email },
  });
  if (!user) {
    return { error: "User doesn't exsit" };
  }
  if (user.password !== password) {
    return { error: "Invalid password for use" };
  }
  return { success: true };
}
