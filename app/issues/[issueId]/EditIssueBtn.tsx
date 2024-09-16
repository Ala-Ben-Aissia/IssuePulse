import {Link} from "@/app/components";
import {Button} from "@radix-ui/themes";

import {FaRegEdit} from "react-icons/fa";

export default function EditIssueBtn({issueId}: {issueId: string}) {
  return (
    <Button>
      <Link href={`/issues/${issueId}/edit`}>
        <span className="flex items-center gap-2 text-white">
          <FaRegEdit />
          Edit Issue
        </span>
      </Link>
    </Button>
  );
}
