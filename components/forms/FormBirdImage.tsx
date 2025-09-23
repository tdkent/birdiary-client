import BirdImage from "@/components/forms/BirdImage";

type FormBirdImageProps = {
  currBirdName: string;
};

export default function FormBirdImage({ currBirdName }: FormBirdImageProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="px-1 text-base font-semibold md:text-lg">
          Preview of bird
        </p>
        <BirdImage
          currBirdName={currBirdName}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 75vw, 598px"
        />
      </div>
    </>
  );
}
