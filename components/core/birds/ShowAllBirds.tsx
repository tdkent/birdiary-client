import { findAllBirds } from "@/data/endpoints";
import { Bird } from "@/models/response";

export default async function ShowAllBirds() {
  const data: Bird[] = await getData();
  return (
    <div id="bird-data-container" className="mt-12">
      <ul>
        {data.map((bird) => {
          return <li key={bird.id}>{bird.comm_name}</li>;
        })}
      </ul>
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
