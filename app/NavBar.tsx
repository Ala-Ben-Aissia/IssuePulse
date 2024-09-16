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
import {FaCircleUser} from "react-icons/fa6";
import {IoBug} from "react-icons/io5";
import {RxAvatar} from "react-icons/rx";

export default function NavBar() {
  const path = usePathname();
  const {status, data} = useSession();

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
            <IoBug size="24" />
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
            // <Link href="/api/auth/signout">Log Out</Link>
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Avatar
                  src={data.user?.image!}
                  fallback={<RxAvatar />}
                  referrerPolicy="no-referrer"
                  radius="full"
                  size="2"
                  className="cursor-pointer"
                />
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Label>
                  <Text size="2">{data.user?.email}</Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                  <Link href="/api/auth/signout">Log out</Link>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          )}
          {status === "unauthenticated" && (
            <Link href="/api/auth/signin">Log in</Link>
          )}
          {status === "loading" && <FaCircleUser size="32" />}
        </Box>
      </Flex>
    </nav>
  );
}
