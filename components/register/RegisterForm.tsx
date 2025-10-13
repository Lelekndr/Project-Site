"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Mail, User, Lock, Building, UserCircle } from "lucide-react";
import Link from "next/link";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
    <div className="p-8 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-white">Criar Conta</h1>
        <p className="text-gray-300 text-sm">
          Preencha os dados para se cadastrar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div className="space-y-2">
          <Label htmlFor="name" className="text-white text-sm font-medium">
            {formData.accountType === "pessoa-fisica" ? "Nome completo" : "Nome da empresa"}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="name"
              name="name"
              type="text"
              placeholder={formData.accountType === "pessoa-fisica" ? "Seu nome completo" : "Nome da empresa"}
              value={formData.name}
              onChange={handleChange}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
              required
            />
          </div>
        </div>

        {/* Tipo de Conta - NOVO CAMPO */}
        <div className="space-y-3">
          <Label className="text-white text-sm font-medium">
            Tipo de conta
          </Label>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="pessoa-fisica"
                name="accountType"
                value="pessoa-fisica"
                checked={formData.accountType === "pessoa-fisica"}
                onChange={handleChange}
                className="w-4 h-4 text-purple-400 bg-white/10 border-white/20 focus:ring-purple-400 focus:ring-2"
              />
              <Label 
                htmlFor="pessoa-fisica" 
                className="flex items-center space-x-2 text-white text-sm cursor-pointer"
              >
                <UserCircle className="h-4 w-4 text-gray-400" />
                <span>Pessoa Física</span>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="radio"
                id="pessoa-juridica"
                name="accountType"
                value="pessoa-juridica"
                checked={formData.accountType === "pessoa-juridica"}
                onChange={handleChange}
                className="w-4 h-4 text-purple-400 bg-white/10 border-white/20 focus:ring-purple-400 focus:ring-2"
              />
              <Label 
                htmlFor="pessoa-juridica" 
                className="flex items-center space-x-2 text-white text-sm cursor-pointer"
              >
                <Building className="h-4 w-4 text-gray-400" />
                <span>Pessoa Jurídica</span>
              </Label>
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white text-sm font-medium">
            E-mail
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
              required
            />
          </div>
        </div>

        {/* Senha */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white text-sm font-medium">
            Senha
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Sua senha"
              value={formData.password}
              onChange={handleChange}
              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Confirmar Senha */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-white text-sm font-medium">
            Confirmar senha
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirme sua senha"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        <Button 
          type="submit"
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-2.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
        >
          Criar Conta
        </Button>
      </form>

      <div className="text-center space-y-4">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/20"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-neutral-900/70 text-gray-400">ou</span>
          </div>
        </div>

        <p className="text-sm text-gray-300">
          Já tem uma conta?{" "}
          <Link 
            href="/login" 
            className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
          >
            Entre aqui
          </Link>
        </p>
      </div>
    </div>
  );
}