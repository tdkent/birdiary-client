import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
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

export default function PasswordInput({
  field,

  pending,
}: PasswordInputProps) {
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
          type={isVisible ? "text" : "password"}
        />
        <Button
          aria-label={`${isVisible ? "Hide" : "Show"} Password`}
          className="my-0 h-14 px-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-0 md:px-6"
          onClick={() => setIsVisible((prev) => !prev)}
          size="icon"
          type="button"
        >
          {isVisible ? (
            <Eye size={22} strokeWidth={1.5} />
          ) : (
            <EyeOff size={22} strokeWidth={1.5} />
          )}
        </Button>
      </div>
    </>
  );
}
