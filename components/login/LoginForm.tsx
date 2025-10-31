"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; 
import { Globe } from "lucide-react"; 

import { LoginSchema, LoginFormValues } from "@/lib/schemas"; 
import { useAuth } from "@/contexts/AuthContext";
import { TEST_CREDENTIALS } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

// Componentes modulares
import { LoginLogo } from "./LoginLogo";
import { TestCredentials } from "./TestCredentials";
import { ErrorMessage } from "./ErrorMessage";
import { LoginFormFields } from "./LoginFormFields";


export function LoginForm() { 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const router = useRouter();
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema), 
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  async function onSubmit(values: LoginFormValues) {
    setIsLoading(true);
    setError("");
    
    try {
      const success = await login(values.email, values.password);
      if (success) {
        router.push('/');
      } else {
        setError("Credenciais inválidas. Tente novamente.");
      }
    } catch {
      setError("Erro ao fazer login. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  const fillCredentials = (role: 'user' | 'creator' | 'admin') => {
    const credentials = TEST_CREDENTIALS[role];
    form.setValue('email', credentials.email);
    form.setValue('password', credentials.password);
  };

  return (
    <div className="flex flex-col space-y-6 text-white p-4">
      <LoginLogo />
      
      <TestCredentials onFillCredentials={fillCredentials} />
      
      <ErrorMessage message={error} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <LoginFormFields control={form.control} />

          <Button 
            type="submit" 
            className="w-full bg-indigo-700 hover:bg-indigo-600 font-bold py-2 tracking-wide transition-all duration-200"
            disabled={isLoading} 
          >
            {isLoading ? 'Entrando...' : 'Login'}
          </Button>
        </form>
      </Form>
      
      <Button 
        variant="outline" 
        className="w-full border-2 border-purple-500 text-purple-400 bg-transparent hover:bg-purple-900/20 mt-4 font-bold transition-all duration-200"
      >
        <Globe className="mr-2 h-4 w-4" />
        Página do promoter
      </Button>
    </div>
  );
}