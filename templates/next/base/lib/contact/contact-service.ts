import { z } from "zod";
import { addCollectionItem, listCollection } from "@/lib/cms/cms-service";
import type { ContactMessage } from "./contact-types";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(10).max(2000),
  website: z.string().max(0).optional()
});

export async function submitContactMessage(input: z.infer<typeof contactMessageSchema>): Promise<void> {
  const parsed = contactMessageSchema.parse(input);
  await addCollectionItem("messages", {
    name: parsed.name,
    email: parsed.email,
    message: parsed.message,
    published: false
  });
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  return listCollection<ContactMessage>("messages");
}
