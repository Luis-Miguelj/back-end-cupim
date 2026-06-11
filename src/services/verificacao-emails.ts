import { users } from "@/db/schema";
import { db } from "@/db";
import { eq } from "drizzle-orm";

export async function verificacaoEmails(email: string) {
  const [verify] = await db.select().from(users).where(eq(users.email, email.toLowerCase()))

  if (!verify) {
    return false
  }

  return true
}