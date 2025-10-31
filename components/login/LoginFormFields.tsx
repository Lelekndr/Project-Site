import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ControllerRenderProps, Control } from "react-hook-form";
import { LoginFormValues } from "@/lib/schemas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface LoginFormFieldsProps {
  control: Control<LoginFormValues>;
}

export function LoginFormFields({ control }: LoginFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <>
      {/* Campo E-mail */}
      <FormField
        control={control}
        name="email"
        render={({ field }: { field: ControllerRenderProps<LoginFormValues, "email"> }) => (
          <FormItem>
            <div className="flex justify-between items-center">
              <FormLabel className="text-sm font-medium text-purple-400">
                Email
              </FormLabel>
              <a 
                href="/register" 
                className="text-xs text-purple-400 hover:underline transition-colors duration-200"
              >
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
        control={control}
        name="password"
        render={({ field }: { field: ControllerRenderProps<LoginFormValues, "password"> }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-purple-400">
              Password
            </FormLabel>
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
        control={control}
        name="rememberMe"
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
              <Label className="text-sm text-zinc-400">Remember me</Label>
            </div>
          </FormItem>
        )}
      />
    </>
  );
}
