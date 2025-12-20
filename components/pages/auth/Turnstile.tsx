"use client";

import { TURNSTILE_URL } from "@/constants/constants";
import { TURNSTILE_SITE_KEY } from "@/constants/env";
import { useTheme } from "next-themes";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

declare global {
  interface Window {
    turnstile: {
      remove: (id: string) => {};
      render: (
        id: string,
        options: {
          sitekey: string;
          callback: (token: string) => void;
          theme: string;
        },
      ) => {};
      reset: (id: string) => {};
    };
  }
}

type TurnstileProps = {
  isExpired: boolean;
  isValidated: boolean;
  setIsExpired: Dispatch<SetStateAction<boolean>>;
  setToken: Dispatch<SetStateAction<string | null>>;
};

// https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/#explicit-rendering
export default function Turnstile({
  isExpired,
  isValidated,
  setIsExpired,
  setToken,
}: TurnstileProps) {
  const [widgetId, setWidgetId] = useState<string | null>(null);

  const { theme } = useTheme();

  const widgetTheme = theme !== "light" && theme !== "dark" ? "auto" : theme;

  // Init cft widget and script
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
        theme: widgetTheme,
      }) as string;
      setWidgetId(id);
    };

    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setToken]);

  // Handle expired cft token
  useEffect(() => {
    if (isExpired && widgetId) {
      window.turnstile.reset(widgetId);
      setIsExpired(false);
    }
  }, [isExpired, setIsExpired, widgetId]);

  // Remove widget if validated
  useEffect(() => {
    if (isValidated && widgetId && window.turnstile) {
      window.turnstile.remove(widgetId);
    }
  }, [isValidated, widgetId]);

  return (
    <>
      <div id="turnstile-container"></div>
    </>
  );
}
