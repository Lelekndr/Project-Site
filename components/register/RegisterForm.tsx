"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Mail, User, ArrowLeft, CheckCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { TextField } from "./TextField";
import { PasswordField } from "./PasswordField";
import { AccountTypeSelector } from "./AccountTypeSelector";
import { RegisterFooter } from "./RegisterFooter";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  cnpj?: string;
  general?: string;
}

export function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    cnpj: "",
    accountType: "pessoa-fisica"
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const router = useRouter();

  // Validação de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validação de senha
  const isValidPassword = (password: string): boolean => {
    return password.length >= 6;
  };

  // Validação de CNPJ (formato básico)
  const isValidCNPJ = (cnpj: string): boolean => {
    const cleanCNPJ = cnpj.replace(/\D/g, '');
    return cleanCNPJ.length === 14;
  };

  // Formatação de CNPJ
  const formatCNPJ = (value: string): string => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 14) {
      return cleanValue.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  // Validação completa do formulário
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validar nome
    if (!formData.name.trim()) {
      newErrors.name = "Nome é obrigatório";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Nome deve ter pelo menos 2 caracteres";
    }

    // Validar email
    if (!formData.email.trim()) {
      newErrors.email = "Email é obrigatório";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = "Email inválido";
    }

    // Validar CNPJ (apenas para pessoa jurídica)
    if (formData.accountType === "pessoa-juridica") {
      if (!formData.cnpj.trim()) {
        newErrors.cnpj = "CNPJ é obrigatório para pessoa jurídica";
      } else if (!isValidCNPJ(formData.cnpj)) {
        newErrors.cnpj = "CNPJ deve conter 14 dígitos";
      }
    }

    // Validar senha
    if (!formData.password) {
      newErrors.password = "Senha é obrigatória";
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = "Senha deve ter pelo menos 6 caracteres";
    }

    // Validar confirmação de senha
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Confirme sua senha";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "As senhas não coincidem";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simular chamada da API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simular sucesso
      console.log("Register data:", formData);
      setShowSuccessModal(true);
      
    } catch {
      setErrors({ general: "Erro ao criar conta. Tente novamente." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Formatar CNPJ automaticamente
    const finalValue = name === 'cnpj' ? formatCNPJ(value) : value;
    
    setFormData(prev => ({
      ...prev,
      [name]: finalValue
    }));

    // Limpar erros quando o usuário começar a digitar
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Validação em tempo real para confirmação de senha
    if (name === 'confirmPassword' && formData.password !== value) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "As senhas não coincidem"
      }));
    } else if (name === 'confirmPassword' && formData.password === value) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: undefined
      }));
    }

    // Validação em tempo real para senha principal
    if (name === 'password' && formData.confirmPassword && formData.confirmPassword !== value) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: "As senhas não coincidem"
      }));
    } else if (name === 'password' && formData.confirmPassword && formData.confirmPassword === value) {
      setErrors(prev => ({
        ...prev,
        confirmPassword: undefined
      }));
    }
  };

  return (
    <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 max-w-md mx-auto w-full">
      <Link 
        href="/" 
        className="flex items-center space-x-2 text-white/70 hover:text-white transition-colors duration-200 group mb-2 w-fit"
      >
        <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 group-hover:-translate-x-1 transition-transform duration-200" />
        <span className="text-xs sm:text-sm font-medium">Voltar</span>
      </Link>
      
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-bold text-white">Criar Conta</h1>
        <p className="text-gray-300 text-xs sm:text-sm">
          Preencha os dados para se cadastrar
        </p>
      </div>

      {/* Mensagem de erro geral */}
      {errors.general && (
        <div 
          className="bg-red-600/20 border border-red-600/50 rounded-lg p-3"
          role="alert"
          aria-live="polite"
        >
          <p className="text-red-400 text-sm">{errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-2 sm:space-y-3">
        <div>
          <TextField
            id="name"
            name="name"
            label={formData.accountType === "pessoa-fisica" ? "Nome completo" : "Nome da empresa"}
            placeholder={formData.accountType === "pessoa-fisica" ? "Seu nome completo" : "Nome da empresa"}
            value={formData.name}
            onChange={handleChange}
            icon={User}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
          )}
        </div>

        <AccountTypeSelector 
          accountType={formData.accountType}
          onChange={handleChange}
        />

        {/* Campo CNPJ - só aparece para pessoa jurídica */}
        {formData.accountType === "pessoa-juridica" && (
          <div>
            <TextField
              id="cnpj"
              name="cnpj"
              label="CNPJ"
              placeholder="00.000.000/0000-00"
              value={formData.cnpj}
              onChange={handleChange}
              icon={User}
            />
            {errors.cnpj && (
              <p className="text-red-400 text-xs mt-1" role="alert">{errors.cnpj}</p>
            )}
          </div>
        )}

        <div>
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
          {errors.email && (
            <p className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>
          )}
        </div>

        <div>
          <PasswordField
            id="password"
            name="password"
            label="Senha"
            placeholder="Sua senha"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-1" role="alert">{errors.password}</p>
          )}
        </div>

        <div>
          <PasswordField
            id="confirmPassword"
            name="confirmPassword"
            label="Confirmar senha"
            placeholder="Confirme sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p className="text-red-400 text-xs mt-1" role="alert">{errors.confirmPassword}</p>
          )}
        </div>

        <Button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 sm:py-3.5 rounded-lg transition-all duration-200 transform hover:scale-[1.02] text-sm sm:text-base min-h-[48px]"
        >
          {isLoading ? "Criando conta..." : "Criar Conta"}
        </Button>
      </form>

      <RegisterFooter />
      
      {/* Modal de Sucesso */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 sm:p-8 max-w-sm w-full mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Conta criada com sucesso!</h3>
            <p className="text-gray-600 mb-6">
              Bem-vindo ao COLALÁ! Sua conta foi criada e você já pode começar a explorar eventos incríveis.
            </p>
            <Button
              onClick={() => {
                setShowSuccessModal(false);
                router.push('/login');
              }}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-3 rounded-lg transition-all duration-200"
            >
              Fazer Login
            </Button>
          </div>
        </div>
      )}
      
      {/* Espaço extra para garantir acessibilidade no mobile */}
      <div className="h-4 sm:h-0"></div>
    </div>
  );
}