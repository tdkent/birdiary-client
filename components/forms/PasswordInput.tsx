import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye } from "lucide-react";
import { useState } from "react";
import { ControllerRenderProps } from "react-hook-form";

type PasswordInputProps = {
  field: ControllerRenderProps<
    {
      email: string;
      password: string;
    },
    "password"
  >;
  pending: boolean;
};

export default function PasswordInput({ field, pending }: PasswordInputProps) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <div className="flex items-center rounded-md border">
        <Input
          {...field}
          aria-required
          autoComplete="current-password"
          className="border-none"
          disabled={pending}
          type="password"
        />
        <Button aria-label="Show Password" className="border" size="icon">
          <Eye size={24} strokeWidth={1.5} />
        </Button>
      </div>
    </>
  );
}
