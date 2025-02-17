"use client";
import { useEffect } from "react";
import useFormRouter from "@/hooks/useFormRouter";
import { type FormAction } from "@/hooks/useFormRouter";
import { NestResError } from "@/models/error";
import apiRoutes from "@/constants/api";
/*

• Renders a list of the user's recent bird sightings.
• Fetch location is determined by the user's auth status.
• If the user is not signed in, the "sightings" key will fetched from local storage.
• If the user is signed in, send GET request to web server.
• The sightings array is mapped to render sighting cards.

*/

export default function SightingList() {
  const { checkAuthAndSubmit, isPending, setIsPending } = useFormRouter();

  useEffect(() => {
    const requestData: FormAction = {
      formValues: {},
      method: "GET",
      route: apiRoutes.SIGHTING,
      key: "sightings",
    };

    async function fetchSightings() {
      const res = await checkAuthAndSubmit(requestData);
    }

    fetchSightings();
  }, [checkAuthAndSubmit]);

  return (
    <section>
      <h2>Recent Sightings</h2>
    </section>
  );
}
