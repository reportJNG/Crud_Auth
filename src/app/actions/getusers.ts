"use server";
import { users } from "@prisma/client";
import { prisma } from "@/lib/prisma";

type GetUserResult = { success: string; Users: users[] } | { error: string };

export async function getuseract(): Promise<GetUserResult> {
  try {
    const All: users[] = await prisma.users.findMany();

    if (!All || All.length === 0) {
      return { error: "Failed to fetch data" };
    }

    return { success: "Successfully fetch data", Users: All };
  } catch (err) {
    return { error: "Failed to fetch data" };
  }
}
