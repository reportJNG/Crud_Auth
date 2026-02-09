"use server";
import { Signupschema } from "@/schemas/signup.schema";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";

export default async function signupact(data: Signupschema) {
  if (!data) return { error: "Try again!" };

  const { email, name, password, confirmpassword } = data;
  if (!email || !name || !password || !confirmpassword) {
    return { error: "All fields are required" };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Invalid email format" };
  }
  if (!/^[A-Za-z0-9]+$/.test(name)) {
    return { error: "Name must contain only letters and numbers" };
  }
  if (
    !/^[A-Za-z0-9]+$/.test(password) ||
    !/^[A-Za-z0-9]+$/.test(confirmpassword)
  ) {
    return { error: "Password must contain only letters and numbers" };
  }

  if (password.length < 6 || password.length > 8) {
    return { error: "Password must be between 6 and 8 characters" };
  }

  if (password !== confirmpassword) {
    return { error: "Passwords do not match" };
  }

  const exist = await prisma.users.findUnique({
    where: { email: email.toLowerCase() },
  });

  if (exist) {
    return { error: "Email is already in use" };
  }

  try {
    const hashedPassword = await hashPassword(password);

    const user = await prisma.users.create({
      data: {
        name,
        email: email.toLowerCase(),
        password: hashedPassword,
      },
    });

    return { success: "Account created successfully" };
  } catch (err) {
    console.error("Signup error:", err);
    return { error: "Failed to create account. Please try again" };
  }
}
