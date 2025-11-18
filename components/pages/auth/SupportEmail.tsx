import { SUPPORT_EMAIL_ADDRESS } from "@/constants/env";

type SupportEmailProps = {
  textSize?: string;
};

export default function SupportEmail({ textSize }: SupportEmailProps) {
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
