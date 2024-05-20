import Users from "@/app/lib/user.model";
import { connectToDatabase } from "@/app/utils/db";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}