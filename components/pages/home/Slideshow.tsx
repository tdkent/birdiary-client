import Image from "next/image";

export default function Slideshow() {
  return (
    <section className="my-12">
      <div className="relative aspect-[5/3] w-full border">
        <Image
          src="https://res.cloudinary.com/dwce3mvbj/image/upload/v1730219480/Great_Blue_Heron_audjs7.jpg"
          alt="Great Blue Heron"
          fill
          className="object-fill"
        />
      </div>
      <details className="mt-2 text-xs">
        <summary>View image attributions</summary>
        <ol>
          <li>Caption 1</li>
          <li>Caption 2</li>
          <li>Caption 3</li>
          <li>Caption 4</li>
        </ol>
      </details>
    </section>
  );
}
