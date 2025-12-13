import {
  TURNSTILE_SCRIPT_SRC,
  TURNSTILE_SITE_KEY,
} from "@/constants/constants";
import Head from "next/head";
import Script from "next/script";

export default function Turnstile() {
  function onSuccess(token: string) {
    console.log(token);
  }
  function onError(errorCode: string) {
    console.error(errorCode);
  }
  function onExpired() {
    console.warn("Turnstile token expired");
  }
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
        data-callback={onSuccess}
        data-error-callback={onError}
        data-expired-callback={onExpired}
      ></div>
    </>
  );
}
