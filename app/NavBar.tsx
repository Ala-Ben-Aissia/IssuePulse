"use client";

import {
  Avatar,
  Box,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import classNames from "classnames";
import {useSession} from "next-auth/react";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {FaRegCircleUser} from "react-icons/fa6";
import {IoBug} from "react-icons/io5";

export default function NavBar() {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Flex justify="between">
        <Flex align="center" gap="5">
          <Link href="/">
            <IoBug size="24" />
          </Link>
          <NavLinks />
        </Flex>
        <AuthStatus />
      </Flex>
    </nav>
  );
}

function AuthStatus() {
  const {data: session, status} = useSession();

  return (
    <Box>
      {status === "authenticated" && (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user?.image!}
              fallback={<FaRegCircleUser />}
              referrerPolicy="no-referrer"
              // in case it does not ommit the image error
              // => see next.config.js
              radius="full"
              size="2"
              className="cursor-pointer"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user?.email}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href="/api/auth/signout">Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      )}
      {status === "unauthenticated" && (
        <Link className="nav-link" href="/api/auth/signin">
          Log in
        </Link>
      )}
    </Box>
  );
}

function NavLinks() {
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
  const path = usePathname();

  return (
    <ul className="flex space-x-6">
      {links.map(({label, href}) => {
        return (
          <li key={href}>
            <Link
              className={classNames({
                "nav-link": true,
                "!text-zinc-900": href === path,
              })}
              href={href}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
