import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface TextFieldProps {
  id: string;
  name: string;
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: LucideIcon;
}

export function TextField({ 
  id, 
  name, 
  label, 
  placeholder, 
  type = "text", 
  value, 
  onChange,
  icon: Icon
}: TextFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-white text-sm font-medium">
        {label}
      </Label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <Input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-purple-400"
          required
        />
      </div>
    </div>
  );
}
