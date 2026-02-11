import { prisma } from "@/lib/prisma";

type delprops = { success: string } | { error: string };
export async function deleteact(id: string): Promise<delprops> {
  try {
    if (!id) {
      return { error: "Try again later" };
    }
    const test = await prisma.users.findUnique({
      where: { id },
    });
    if (!test) {
      return { error: "Failed data" };
    }
    const del = await prisma.users.delete({
      where: { id },
    });
    if (!del) {
      return { error: "Failed to delete" };
    }
    return { success: "User deleted succssefully" };
  } catch (err) {
    return { error: "Failed to fetch" };
  }
}
