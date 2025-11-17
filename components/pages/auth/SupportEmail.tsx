import { SUPPORT_EMAIL_ADDRESS } from "@/constants/env";

export default function SupportEmail() {
  return (
    <>
      <p className="text-lg">
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
