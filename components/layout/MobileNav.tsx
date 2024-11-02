import React from "react";
import { Separator } from "../ui/separator";
import navLinks from "../../data/nav";
import MobileNavLink from "./MobileNavLink";

export default function MobileNav() {
  return (
    <nav>
      <ul className="flex flex-col">
        {navLinks.map(({ label, href, icon }, idx) => {
          return (
            <React.Fragment key={label}>
              <li>
                <div className="py-3">
                  <MobileNavLink label={label} href={href} icon={icon} />
                </div>
              </li>
              {idx !== navLinks.length - 1 && <Separator />}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
}
