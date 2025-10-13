// lib/schemas.ts
import * as z from "zod";

// O nome deve ser 'LoginSchema'
export const LoginSchema = z.object({
  
  email: z.email({ message: "Por favor, insira um e-mail válido." }).min(1, { message: "O e-mail é obrigatório." }),
    
  password: z.string()
    .min(1, { message: "A senha é obrigatória." })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres." }),
    
  rememberMe: z.boolean().default(false).optional(),
});

// O nome do tipo deve ser 'LoginFormValues'
export type LoginFormValues = z.infer<typeof LoginSchema>;