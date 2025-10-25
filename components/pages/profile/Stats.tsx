import { getUserStats } from "@/actions/profile";
import ErrorDisplay from "@/components/pages/shared/ErrorDisplay";
import { ExpectedServerError } from "@/models/api";
import { UserStats } from "@/models/display";

export default async function Stats() {
  const result: UserStats | ExpectedServerError = await getUserStats();

  if ("error" in result) {
    return <ErrorDisplay statusCode={result.statusCode} />;
  }

  return <>stats</>;
}
