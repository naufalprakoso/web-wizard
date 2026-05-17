import { z } from "zod";

export const emailSchema = z.string().email();

export const safeTextSchema = z.string().trim().min(1).max(5000);
