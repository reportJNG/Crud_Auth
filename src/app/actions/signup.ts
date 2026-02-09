"use server";
import { Signupschema } from "@/schemas/signup.schema";
import { prisma } from "@/lib/prisma";

export default async function signupact(data: Signupschema) {
  if (!data) return { error: "Try again!" };

  const { email, name, password, confirmpassword } = data;

  if (!email || !name || !password || !confirmpassword) {
    return { error: "All fields are required" };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Unexpected email" };
  }

  if (
    !/^[A-Za-z0-9]+$/.test(password) ||
    !/^[A-Za-z0-9]+$/.test(confirmpassword)
  ) {
    return { error: "Password must contain only letters and numbers" };
  }

  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return { error: "Name must contain only letters and numbers" };
  }

  if (password.length < 6 || password.length > 8) {
    return { error: "Invalid password length" };
  }

  if (password !== confirmpassword) {
    return { error: "Passwords do not match" };
  }

  const exist = await prisma.users.findUnique({ where: { email } });
  if (exist) return { error: "Email is already in use" };

  try {
    const user = await prisma.users.create({
      data: { name, email, password },
    });

    return { success: "Account created" };
  } catch (err) {
    console.error(err);
    return { error: "Something went wrong" };
  }
}
