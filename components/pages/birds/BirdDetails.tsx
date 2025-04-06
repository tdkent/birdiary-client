import type { SingleBird } from "@/types/models";

type BirdDetailsProps = {
  bird: SingleBird;
};

export default function BirdDetails({ bird }: BirdDetailsProps) {
  return (
    <>
      <section>
        <h1>{bird.commName}</h1>

        <figure>
          <p>img</p>
          <figcaption className="text-xs">{bird.imgAttr}</figcaption>
        </figure>

        <article>
          <p>{bird.commName}</p>
          <p>
            <i>{bird.sciName}</i>
          </p>
          <p>Family: {bird.family.name}</p>
          <p>Conservation Status: {bird.rarity}</p>
          <p>{bird.desc}</p>
        </article>
      </section>
    </>
  );
}
