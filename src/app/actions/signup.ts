"use server";
import { Signupschema } from "@/schemas/signup.schema";
import { prisma } from "@/lib/prisma";

export default async function signupact(data: Signupschema) {
  if (!data) {
    return { error: "Try Again !" };
  }
  if (!data.email) {
    return { error: "Invalid email" };
  }
  if (!data.name) {
    return { error: "Inavlid name" };
  }
  if (
    data.password.length < 6 ||
    data.confirmpassword.length < 6 ||
    data.password.length > 8 ||
    data.confirmpassword.length > 8
  ) {
    return { error: "Inavlid password" };
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
