"use server";
import { prisma } from "@/lib/prisma";

type DelProps = { success: string } | { error: string };

export async function deleteact(id: string): Promise<DelProps> {
  if (!id) {
    return { error: "Invalid user id" };
  }

  try {
    await prisma.users.delete({
      where: { id },
    });

    return { success: "User deleted successfully" };
  } catch (err) {
    return { error: "User not found or already deleted" };
  }
}
