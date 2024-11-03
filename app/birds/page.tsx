import { serverUrl } from "../../constants/env";

export default async function BirdsView() {
  const data = await getData();
  console.log("🚀 ~ BirdsView ~ data:", data);
  return (
    <div>
      <h1>Birdpedia</h1>
      <p>
        Index of all bird species with a rarity rating of Rare or better, as
        determined by the ABA.
      </p>
    </div>
  );
}

async function getData() {
  const response = await fetch(serverUrl + "/bird");

  if (!response.ok) {
    return "There was an error";
  }

  return response.json();
}
