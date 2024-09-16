import {Link as RadixLink} from "@radix-ui/themes";
import NextLink from "next/link";
import {ReactNode} from "react";

export type Props = {
  children: ReactNode;
  href: string;
  color?: "indigo" | "red";
};

export default function Link({href, children, color}: Props) {
  return (
    <NextLink href={href} legacyBehavior>
      <RadixLink color={color}>{children}</RadixLink>
    </NextLink>
  );
}
