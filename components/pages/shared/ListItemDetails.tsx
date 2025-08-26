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
      <li className="list-hover px-4 py-4 text-lg hover:scale-[1.025] md:py-6">
        <Link href={href}>
          <div className="flex flex-col md:w-full md:flex-row md:justify-between md:text-xl">
            <span className="line-clamp-1 font-semibold">{text}</span>
            <span className="italic">{subtext}</span>
          </div>
        </Link>
      </li>
    </>
  );
}
