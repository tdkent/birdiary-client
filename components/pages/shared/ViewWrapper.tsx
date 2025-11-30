/** Wrapper with flex column styling. */
export default function ViewWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="flex flex-col gap-16 md:gap-20 lg:gap-24">{children}</div>
    </>
  );
}
