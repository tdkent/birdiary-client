import SupportEmail from "@/components/pages/auth/SupportEmail";

export default function UnverifiedAccount() {
  return (
    <>
      <div className="flex flex-col gap-2.5 rounded-lg border border-destructive p-4 text-destructive md:w-3/4">
        <p className="text-sm md:text-base">
          Your account isn&apos;t verified yet. Check your inbox for a new
          verification email.
        </p>
        <p className="text-sm md:text-base">
          Check your spam folder if the email does not arrive after a few
          minutes.
        </p>
        <SupportEmail textSize="text-sm md:text-base" />
      </div>
    </>
  );
}
