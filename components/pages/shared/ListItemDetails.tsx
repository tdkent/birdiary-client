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
      <li className="list-hover px-4 py-4 text-lg hover:scale-[1.025]">
        <Link href={href}>
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-semibold">{text}</span>
              <span className="italic">{subtext}</span>
            </div>
          </div>
        </Link>
      </li>
    </>
  );
}
