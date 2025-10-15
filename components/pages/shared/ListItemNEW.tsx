import Icons from "@/components/pages/shared/Icons";
import Link from "next/link";

type ListItemProps = {
  href: string;
  mainText: string;
  subText: string;
  sightings?: string[];
};

export default function ListItemNEW({
  href,
  mainText,
  sightings,
  subText,
}: ListItemProps) {
  return (
    <>
      <li className="list-hover hover:scale-[1.025]">
        <Link href={href} className="">
          <div className="flex items-center justify-between">
            <div className="flex flex-col px-4 py-4 md:w-full md:flex-row md:justify-between md:gap-16 md:py-6 md:text-xl">
              <span className="line-clamp-1 text-base font-semibold md:grow md:text-xl">
                {mainText}
              </span>
              <span className="line-clamp-1 text-sm italic md:shrink-0">
                {subText}
              </span>
            </div>
            {sightings && <Icons sightings={sightings} />}
          </div>
        </Link>
      </li>
    </>
  );
}
