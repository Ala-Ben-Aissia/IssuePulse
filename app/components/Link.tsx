import {Link as RadixLink} from "@radix-ui/themes";
import {colorPropDef} from "@radix-ui/themes/props";
import {ReactNode} from "react";

export type Props = {
  children: ReactNode;
  href?: string;
  color?: (typeof colorPropDef)["color"]["default"];
};

export default function Link({href, children, color}: Props) {
  return (
    <RadixLink href={href} color={color}>
      {children}
    </RadixLink>
  );
}
