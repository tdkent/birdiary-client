import { getLocation } from "@/actions/location";
import type { Location } from "@/types/models";
import type { ExpectedServerError } from "@/types/api";
import LocationMap from "@/components/pages/locations/LocationMap";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";

type LocationDetailsView = {
  params: { name: string };
};

export default async function LocationDetailsView({
  params,
}: LocationDetailsView) {
  const { name } = await params;
  const locationId = name.split("-")[name.split("-").length - 1];

  const location: Location | ExpectedServerError =
    await getLocation(locationId);

  if ("error" in location) {
    const msg = Array.isArray(location.message)
      ? location.message.join(",")
      : location.message;

    return (
      <>
        <ErrorDisplay msg={`${location.error}: ${msg}`} />
      </>
    );
  }

  return (
    <>
      <header>
        <h1>{location.name}</h1>
      </header>
      <LocationMap lat={location.lat} lng={location.lng} />
    </>
  );
}
