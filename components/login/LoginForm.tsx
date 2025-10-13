// components/login/LoginForm.tsx

"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
// 🎯 Import CORRIGIDO: Adicionando ControllerRenderProps
import { useForm, ControllerRenderProps } from "react-hook-form"; 
import { Eye, EyeOff, Globe } from "lucide-react"; 

// Importa o schema (assume que você corrigiu o nome para LoginSchema em lib/schemas.ts)
import { LoginSchema, LoginFormValues } from "@/lib/schemas"; 

// Componentes Shadcn/ui (Ajuste o caminho se seus componentes estiverem em 'ui/common')
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


export function LoginForm() { 
  const [showPassword, setShowPassword] = useState(false);
  
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema), 
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: LoginFormValues) {
    console.log("Dados validados e prontos para API:", values);
  }

  return (
    <div className="flex flex-col space-y-6 text-white p-4">
      
      {/* Logo COLALÁ */}
      <div className="flex items-center space-x-2 mb-6">
        <span className="text-3xl font-bold text-yellow-300">★</span>
        <h1 className="text-3xl font-bold tracking-widest text-white">COLALÁ</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Campo E-mail */}
          <FormField
            control={form.control}
            name="email"
            // 🎯 Tipagem Explícita para 'field' no campo email
            render={({ field }: { field: ControllerRenderProps<LoginFormValues, "email"> }) => (
              <FormItem>
                <div className="flex justify-between items-center">
                  <FormLabel className="text-sm font-medium text-purple-400">Email</FormLabel>
                  <a href="/register" className="text-xs text-purple-400 hover:underline transition-colors duration-200">
                    Cadastre-se
                  </a>
                </div>
                <FormControl>
                  <Input 
                    placeholder="seu@email.com" 
                    className="bg-zinc-900 border-zinc-700 focus:border-purple-500 text-white placeholder:text-zinc-500" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Campo Senha */}
          <FormField
            control={form.control}
            name="password"
            // 🎯 Tipagem Explícita para 'field' no campo password
            render={({ field }: { field: ControllerRenderProps<LoginFormValues, "password"> }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-purple-400">Password</FormLabel>
                <div className="relative">
                  <FormControl>
                    <Input 
                      type={showPassword ? "text" : "password"}
                      placeholder="********" 
                      className="bg-zinc-900 border-zinc-700 focus:border-purple-500 text-white pr-10 placeholder:text-zinc-500" 
                      {...field} 
                    />
                  </FormControl>
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    className="absolute right-0 top-0 h-full px-3 text-purple-400 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Checkbox "Remember me" */}
          <FormField
            control={form.control}
            name="rememberMe"
            // 🎯 Tipagem Explícita para 'field' no campo rememberMe
            render={({ field }: { field: ControllerRenderProps<LoginFormValues, "rememberMe"> }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="border-purple-500 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <Label className="text-sm text-zinc-400">Remember se</Label>
                </div>
              </FormItem>
            )}
          />

          {/* Botão Primário: Login */}
          <Button 
            type="submit" 
            className="w-full bg-indigo-700 hover:bg-indigo-600 font-bold py-2 tracking-wide transition-all duration-200"
            disabled={form.formState.isSubmitting} 
          >
            {form.formState.isSubmitting ? 'Entrando...' : 'Login'}
          </Button>
        </form>
      </Form>
      
      {/* Botão Secundário: Página do promoter */}
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