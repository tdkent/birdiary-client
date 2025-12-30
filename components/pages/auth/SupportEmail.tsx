type SupportEmailProps = {
  textSize?: string;
};

export default function SupportEmail({ textSize }: SupportEmailProps) {
  const SUPPORT_EMAIL_ADDRESS = "support@mybirdiary.com";
  return (
    <>
      <p className={`${textSize || "text-lg"}`}>
        Need help? Contact us at{" "}
        <span className="font-semibold">
          <a href={`mailto:${SUPPORT_EMAIL_ADDRESS}`}>
            {SUPPORT_EMAIL_ADDRESS}
          </a>
        </span>
        .
      </p>
    </>
  );
}
