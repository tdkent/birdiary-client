"use client";

import {
  AdvancedMarker,
  APIProvider,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { GOOGLE_API_KEY, GOOGLE_LOCATION_MAP_ID } from "@/constants/env";

type LocationMapProps = {
  lat: number | undefined;
  lng: number | undefined;
};

export default function LocationMap({ lat, lng }: LocationMapProps) {
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
    <section className="my-8 h-[400px] w-full">
      <APIProvider apiKey={GOOGLE_API_KEY} onLoad={() => console.log("loaded")}>
        <Map
          defaultZoom={15}
          defaultCenter={{ lat, lng }}
          mapId={GOOGLE_LOCATION_MAP_ID}
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
    </section>
  );
}
