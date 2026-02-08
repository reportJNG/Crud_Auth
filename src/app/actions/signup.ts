"use server";
import { Signupschema } from "@/schemas/signup.schema";
import { prisma } from "@/lib/prisma";

export default async function signup(data: Signupschema) {
  if (!data) {
    return { error: "Try Again !" };
  }
  if (!data.email) {
    return { error: "Invalid email" };
  }
  if (!data.name) {
    return { error: "Inavlid name" };
  }
  if (data.password !== data.confirmpassword) {
    return { error: "Password doesnt match" };
  }
  const email = data.email as string;
  const password = data.password as string;
  const name = data.name as string;

  const user = await prisma.users.create({
    data: {
      name: name,
      email: email,
      password: password,
    },
  });

  if (user) {
    return { success: "Created Account" };
  }
}
