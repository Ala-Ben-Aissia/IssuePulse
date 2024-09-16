"use client";

import {Box, Spinner} from "@radix-ui/themes";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaBug} from "react-icons/fa";

export default function NavBar() {
  const path = usePathname();
  const {status} = useSession();

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
            <li key={href}>
              <Link
                className={classNames({
                  "text-zinc-900": href === path,
                  "text-zinc-500": href !== path,
                  "hover:text-zinc-800 transition-all duration-300": 1,
                })}
                href={href}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
      <Box>
        {status === "authenticated" && (
          <Link href="/api/auth/signout">Log Out</Link>
        )}
        {status === "unauthenticated" && (
          <Link href="/api/auth/signin">Log in</Link>
        )}
        {status === "loading" && <Spinner />}
      </Box>
    </nav>
  );
}
