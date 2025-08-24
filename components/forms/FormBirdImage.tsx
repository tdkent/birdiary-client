import BirdImage from "@/components/forms/BirdImage";

type FormBirdImageProps = {
  currBirdName: string;
};

export default function FormBirdImage({ currBirdName }: FormBirdImageProps) {
  return (
    <>
      <div className="flex flex-col gap-2">
        <p className="px-1 text-base font-semibold">Preview of bird</p>
        <BirdImage currBirdName={currBirdName} />
      </div>
    </>
  );
}
