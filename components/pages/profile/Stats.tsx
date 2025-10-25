import { getUserStats } from "@/actions/profile";

export default async function Stats() {
  const data = await getUserStats();
  return <>stats</>;
}
