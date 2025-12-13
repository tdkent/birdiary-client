import { TURNSTILE_SCRIPT_SRC } from "@/constants/constants";
import { TURNSTILE_SITE_KEY } from "@/constants/env";
import Head from "next/head";
import Script from "next/script";

export default function Turnstile() {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://challenges.cloudflare.com" />
      </Head>
      <Script src={TURNSTILE_SCRIPT_SRC} async defer />
      <div
        className="cf-turnstile"
        data-sitekey={TURNSTILE_SITE_KEY}
        data-theme="light"
        data-size="normal"
        data-callback="onSuccess"
      ></div>
    </>
  );
}
