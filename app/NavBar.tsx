"use client";

import {Box, Flex, Spinner} from "@radix-ui/themes";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {IoBug} from "react-icons/io5";

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
    <nav className="border-b mb-5 px-5 py-2">
      <Flex justify="between" align="center">
        <Flex align="center">
          <Link href="/" className="my-1 mr-5">
            <IoBug />
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
        </Flex>
        <Box>
          {status === "authenticated" && (
            <Link href="/api/auth/signout">Log Out</Link>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Log in</Link>
          )}
          {status === "loading" && <Spinner />}
        </Box>
      </Flex>
    </nav>
  );
}
