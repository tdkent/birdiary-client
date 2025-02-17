export default function PageContainer({
  header,
  desc,
  children,
}: {
  header: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div id="core-layout-container">
      <header id="core-layout-header">
        <h1>{header}</h1>
        <p>{desc}</p>
      </header>
      <div id="core-layout-content">{children}</div>
    </div>
  );
}
