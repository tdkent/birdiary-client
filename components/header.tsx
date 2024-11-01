import { ModeToggle } from "./mode-toggle";

export default function Header() {
  return (
    <header className="flex justify-between items-center h-20 border-b">
      <h1>Birdiary</h1>
      <ModeToggle />
    </header>
  );
}
