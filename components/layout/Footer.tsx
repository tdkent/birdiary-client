export default function Footer() {
  const attributions = [
    {
      dt: "Blue Jay",
      dd: "Paul Danese, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons",
    },
    {
      dt: "Emperor Goose",
      dd: "USFWSAlaska, Public domain, via Wikimedia Commons",
    },
    {
      dt: "Northern Cardinal",
      dd: "Paul Danese, CC BY-SA 4.0 <https://creativecommons.org/licenses/by-sa/4.0>, via Wikimedia Commons",
    },
    {
      dt: "Painted Bunting",
      dd: "Andrew C, CC BY 2.0 <https://creativecommons.org/licenses/by/2.0>, via Wikimedia Commons",
    },
  ];
  return (
    <footer className="flex min-h-28 items-center border-t px-6 py-8">
      <div className="mx-auto flex w-full max-w-[1024px] flex-col gap-4">
        <p className="text-sm">&copy; 2025 Birdiary. All Rights Reserved.</p>
        <details className="text-xs hover:cursor-pointer">
          <summary>Icon and logo image attributions</summary>
          <dl className="flex flex-col gap-2 p-3">
            {attributions.map(({ dt, dd }) => {
              return (
                <div key={dt}>
                  <dt>{dt}</dt>
                  <dd>{dd}</dd>
                </div>
              );
            })}
          </dl>
        </details>
      </div>
    </footer>
  );
}
