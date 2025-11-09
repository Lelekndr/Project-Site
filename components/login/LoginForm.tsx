"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"; 
import { ArrowLeft } from "lucide-react";
import Link from "next/link"; 

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
    <div 
      className="flex flex-col space-y-3 sm:space-y-4 text-white p-4 sm:p-6 max-w-md mx-auto w-full"
      role="main"
      aria-label="Formulário de login"
    >
      <Link 
        href="/" 
        className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 group mb-2 w-fit"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-xs sm:text-sm font-medium">Voltar</span>
      </Link>
      
      <LoginLogo />
      
      <TestCredentials onFillCredentials={fillCredentials} />
      
      <ErrorMessage message={error} />

      <Form {...form}>
        <form 
          onSubmit={form.handleSubmit(onSubmit)} 
          className="space-y-3 sm:space-y-4"
          noValidate
        >
          <LoginFormFields control={form.control} />

          <Button 
            type="submit" 
            className="w-full bg-indigo-700 hover:bg-indigo-600 font-bold py-3 sm:py-4 tracking-wide transition-all duration-200 text-base min-h-[48px]"
            disabled={isLoading}
            aria-describedby={error ? "login-error" : undefined}
          >
            {isLoading ? 'Entrando...' : 'Login'}
          </Button>
        </form>
      </Form>
      
      {/* Espaço extra para garantir acessibilidade no mobile */}
      <div className="h-4 sm:h-0"></div>
    </div>
  );
}