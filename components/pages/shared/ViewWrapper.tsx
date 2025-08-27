/** Wrapper with flex column styling. */
export default function ViewWrapper({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <div className="flex flex-col gap-10 md:gap-16 lg:gap-20">{children}</div>
    </>
  );
}
