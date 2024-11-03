import { Bird } from "@/models/response-models";
import { findAllBirds } from "@/data/endpoints";

export default async function BirdsView() {
  const data: Bird[] = await getData();
  console.log("🚀 ~ BirdsView ~ data:", data);
  return (
    <div>
      <h1>Birdpedia</h1>
      <p>
        Index of all bird species with a rarity rating of Rare or better, as
        determined by the ABA.
      </p>
      <div className="mt-12">
        <ul>
          {data.map((bird) => {
            return <li key={bird.id}>{bird.comm_name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}

async function getData() {
  const response = await fetch(findAllBirds);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error("Route does not exist");
    }
    if (response.status === 500) {
      throw new Error("The server is down");
    }
    throw new Error("An unknown error occurred");
  }

  return response.json();
}
