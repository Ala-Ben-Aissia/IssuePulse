import {Button} from "@radix-ui/themes";
import Link from "next/link";
import {PropsWithChildren} from "react";

export default function IssueActionBtn({
  children,
}: PropsWithChildren) {
  return (
    <Button className="mb-5">
      <Link href={"/issues/new"} color="white">
        New Issue
      </Link>
    </Button>
  );
}
