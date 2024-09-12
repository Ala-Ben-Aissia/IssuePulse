"use client";

import classNames from "classnames";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaBug} from "react-icons/fa";

export default function NavBar() {
  const path = usePathname();

  const links = [
    {
      label: "Dashboard",
      href: "/",
    },
    {
      label: "Issues",
      href: "/issues",
    },
  ];

  return (
    <nav className="flex space-x-6 border-b mb-5 px-5 h-14 items-center">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="flex space-x-6">
        {links.map(({label, href}) => {
          return (
            <Link
              className={classNames({
                "text-zinc-900": href === path,
                "text-zinc-500": href !== path,
                "hover:text-zinc-800 transition-all duration-300": 1,
              })}
              key={href}
              href={href}
            >
              {label}
            </Link>
          );
        })}
      </ul>
    </nav>
  );
}
