import SupportEmail from "@/components/pages/auth/SupportEmail";

export default function UnverifiedAccount() {
  return (
    <>
      <div className="flex flex-col gap-2.5 rounded-lg border border-destructive p-4 text-destructive md:w-3/4">
        <p className="text-sm md:text-base">
          Please verify your account to sign in.
        </p>
        <p className="text-sm md:text-base">
          Check your inbox for a verification email.
        </p>
        <SupportEmail textSize="text-sm md:text-base" />
      </div>
    </>
  );
}
