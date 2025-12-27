"use client";

import CONFIG from "@/constants/config.constants";
import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type LocationMapProps = {
  lat: number | undefined;
  lng: number | undefined;
};

export default function LocationMap({ lat, lng }: LocationMapProps) {
  // Force refresh of map view after update.
  const [mapKey, setMapKey] = useState(0);
  useEffect(() => setMapKey((prev) => prev + 1), [lat, lng]);

  if (!lat || !lng) {
    return (
      <>
        <div>
          <p>Map data is unavailable for this location.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="aspect-square w-full md:aspect-[5/4] lg:aspect-[5/3]">
        <APIProvider apiKey={CONFIG.GOOGLE_API_KEY}>
          <Map
            defaultZoom={12}
            defaultCenter={{ lat, lng }}
            mapId={CONFIG.GOOGLE_LOCATION_MAP_ID}
            key={mapKey}
          >
            <AdvancedMarker position={{ lat, lng }}>
              <Pin
                background={"#FBBC04"}
                glyphColor={"#000"}
                borderColor={"#000"}
              />
            </AdvancedMarker>
          </Map>
        </APIProvider>
      </div>
    </>
  );
}
