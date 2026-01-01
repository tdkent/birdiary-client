import { CURR_YEAR } from "@/helpers/date.helpers";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex min-h-28 items-center border-t px-6 py-8">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-4">
        <p className="text-sm">
          &copy; {CURR_YEAR} Birdiary. All Rights Reserved.
        </p>
        <Link className="text-xs" href="/legal">
          Terms of Service &amp; Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
