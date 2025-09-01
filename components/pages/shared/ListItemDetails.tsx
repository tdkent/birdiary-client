import Link from "next/link";

type ListItemDetailsProps = {
  href: string;
  text: string;
  subtext: string;
};

export default function ListItemDetails({
  href,
  text,
  subtext,
}: ListItemDetailsProps) {
  return (
    <>
      <li className="list-hover hover:scale-[1.025]">
        <Link href={href}>
          <div className="flex flex-col px-4 py-4 md:w-full md:flex-row md:justify-between md:gap-16 md:py-6">
            <span className="line-clamp-1 text-lg font-semibold md:grow md:text-xl">
              {text}
            </span>
            <span className="text-lg italic md:shrink-0">{subtext}</span>
          </div>
        </Link>
      </li>
    </>
  );
}
