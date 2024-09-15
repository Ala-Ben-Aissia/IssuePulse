import {Link as RadixLink} from "@radix-ui/themes";
import NextLink from "next/link";
import {ReactNode} from "react";

export type Props = {
  children: ReactNode;
  href: string;
};

export default function Link({href, children}: Props) {
  return (
    <NextLink href={href} legacyBehavior>
      <RadixLink>{children}</RadixLink>
    </NextLink>
  );
}
