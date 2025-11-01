"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, User } from "lucide-react";

import { TextField } from "./TextField";
import { PasswordField } from "./PasswordField";
import { AccountTypeSelector } from "./AccountTypeSelector";
import { RegisterFooter } from "./RegisterFooter";

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "pessoa-fisica" // Novo campo
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de cadastro aqui
    console.log("Register data:", formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 max-w-md mx-auto w-full">
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Criar Conta</h1>
        <p className="text-gray-300 text-xs sm:text-sm">
          Preencha os dados para se cadastrar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
        <TextField
          id="name"
          name="name"
          label={formData.accountType === "pessoa-fisica" ? "Nome completo" : "Nome da empresa"}
          placeholder={formData.accountType === "pessoa-fisica" ? "Seu nome completo" : "Nome da empresa"}
          value={formData.name}
          onChange={handleChange}
          icon={User}
        />

        <AccountTypeSelector 
          accountType={formData.accountType}
          onChange={handleChange}
        />

        <TextField
          id="email"
          name="email"
          label="E-mail"
          placeholder="seu@email.com"
          type="email"
          value={formData.email}
          onChange={handleChange}
          icon={Mail}
        />

        <PasswordField
          id="password"
          name="password"
          label="Senha"
          placeholder="Sua senha"
          value={formData.password}
          onChange={handleChange}
        />

        <PasswordField
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar senha"
          placeholder="Confirme sua senha"
          value={formData.confirmPassword}
          onChange={handleChange}
        />

        <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 sm:py-3.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base min-h-[48px]"
        >
          Criar Conta
        </Button>
      </form>

      <RegisterFooter />
    </div>
  );
}