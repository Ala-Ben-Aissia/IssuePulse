import {Link} from "@/app/components";
import {Button} from "@radix-ui/themes";
import {Props} from "./Link";

export default function IssueActionBtn({href, children}: Props) {
  return (
    <Link href={href}>
      <Button className="mb-5">{children}</Button>
    </Link>
  );
}
