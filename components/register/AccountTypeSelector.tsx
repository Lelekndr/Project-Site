import { UserCircle, Building } from "lucide-react";
import { Label } from "@/components/ui/label";

interface AccountTypeSelectorProps {
  accountType: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function AccountTypeSelector({ accountType, onChange }: AccountTypeSelectorProps) {
  return (
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
            checked={accountType === "pessoa-fisica"}
            onChange={onChange}
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
            checked={accountType === "pessoa-juridica"}
            onChange={onChange}
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
  );
}
