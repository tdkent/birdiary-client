import SupportEmail from "@/components/pages/auth/SupportEmail";

export default function InvalidVerificationLink() {
  return (
    <>
      <div className="my-12 flex flex-col gap-4 px-4 py-8 md:gap-6 lg:my-20">
        <h1 className="font-heading text-3xl">Expired link</h1>
        <p className="text-lg">
          The verification link you followed is invalid or expired.
        </p>
        <SupportEmail />
      </div>
    </>
  );
}
