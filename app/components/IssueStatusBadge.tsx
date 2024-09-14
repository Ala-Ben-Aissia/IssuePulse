import {Status} from "@prisma/client";
import {Badge} from "@radix-ui/themes";

type STATUSMAP = Record<
  Status,
  {label: string; color: "red" | "violet" | "green"}
>;

const statusMap: STATUSMAP = {
  OPEN: {label: "Open", color: "red"},
  CLOSED: {label: "Closed", color: "green"},
  IN_PROGRESS: {label: "In Progress", color: "violet"},
};

export default function IssueStatusBadge({status}: {status: Status}) {
  return (
    <Badge color={statusMap[status].color}>
      {statusMap[status].label}
    </Badge>
  );
}
