import Image from "next/image";

export default function BirdOfTheDay() {
  return (
    <section className="my-4 rounded-md border p-2">
      <h2>Bird of the Day</h2>
      <div className="relative aspect-[5/3] w-full border">
        <Image
          src="https://res.cloudinary.com/dwce3mvbj/image/upload/v1730219480/Great_Blue_Heron_audjs7.jpg"
          alt="Great Blue Heron"
          fill
          className="rounded-md object-fill"
        />
      </div>
      <p className="text-sm">Your sightings: No sightings yet!</p>
    </section>
  );
}
