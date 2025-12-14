"use client";

import { TURNSTILE_URL } from "@/constants/constants";
import { TURNSTILE_SITE_KEY } from "@/constants/env";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

declare global {
  interface Window {
    turnstile: {
      render: (
        id: string,
        options: { sitekey: string; callback: (token: string) => void },
      ) => {};
      reset: (id: string) => {};
    };
  }
}

type TurnstileProps = {
  isExpired: boolean;
  setIsExpired: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | null>>;
};

// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicit-rendering
export default function Turnstile({
  isExpired,
  setIsExpired,
  setToken,
}: TurnstileProps) {
  const [widgetId, setWidgetId] = useState<string | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = TURNSTILE_URL;
    script.defer = true;
    script.onload = () => {
      const id = window.turnstile.render("#turnstile-container", {
        sitekey: TURNSTILE_SITE_KEY,
        callback: function (token) {
          setToken(token);
        },
      }) as string;
      setWidgetId(id);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [setToken]);

  useEffect(() => {
    if (isExpired && widgetId) {
      window.turnstile.reset(widgetId);
      setIsExpired(false);
    }
  }, [isExpired, setIsExpired, widgetId]);

  return (
    <>
      <div id="turnstile-container"></div>
    </>
  );
}
