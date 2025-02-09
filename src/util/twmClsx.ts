import { clsx, ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const twmClsx = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
