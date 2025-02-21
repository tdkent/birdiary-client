"use client";
import { useState } from "react";
import useFormRouter from "@/hooks/useFormRouter";
import { type FormAction } from "@/hooks/useFormRouter";
import { NestResError } from "@/types/error";
import useQuery from "@/hooks/useQuery";
import apiRoutes from "@/constants/api";
/*

• Renders a list of the user's recent bird sightings.
• Fetch location is determined by the user's auth status.
• If the user is not signed in, the "sightings" key will fetched from local storage.
• If the user is signed in, send GET request to web server.
• The sightings array is mapped to render sighting cards.

*/

type RecentSighting = {
  id: number;
  date: Date;
  bird: {
    comm_name: string;
    id: number;
  };
};

export default function SightingList() {
  const [scrollPage, setScrollPage] = useState(1);
  const { fetchedData, isPending, error } = useQuery<RecentSighting>(
    "sightings",
    apiRoutes.SIGHTING_RECENT(scrollPage)
  );

  // console.log(fetchedData, isPending, error);
  if (!fetchedData.length) {
    return <p>No recent sightings</p>;
  }

  return (
    <section>
      <h2>Recent Sightings</h2>
      <ul>
        {fetchedData.map((sighting) => {
          console.log(sighting);
          return <li key={sighting.id}>{sighting.bird?.comm_name}</li>;
        })}
      </ul>
    </section>
  );
}
