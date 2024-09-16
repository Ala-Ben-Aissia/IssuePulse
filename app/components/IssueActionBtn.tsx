import {Link} from "@/app/components";
import {Button} from "@radix-ui/themes";

export default function IssueActionBtn({
  href,
  children,
  color,
  ...props
}: any) {
  return (
    <Link color={color} href={href}>
      <Button className="mb-5" {...props}>
        {children}
      </Button>
    </Link>
  );
}
