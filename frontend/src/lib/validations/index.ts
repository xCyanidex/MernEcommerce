import * as z from "zod";

export const SignUpformSchema = z.object({
  username: z.string().min(5).max(10,{message:"Username must be of at least 5 characters."}),
  email: z.string().email(),
  password: z.string().min(8,{message:"Password must be of at least 8 characters."}),
});

export const SignIpformSchema = z.object({
email: z.string().email(),
  password: z.string().min(8,{message:"Password must be of at least 8 characters."}),
});