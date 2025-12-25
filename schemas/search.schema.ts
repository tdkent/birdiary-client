import { z } from "zod";

export const SearchInputSchema = z.string().min(3).max(100);
