import {IssueActionBtn} from "@/app/components";
import {Button} from "@radix-ui/themes";
import {FaRegEdit} from "react-icons/fa";

export default function EditIssueBtn({issueId}: {issueId: string}) {
  return (
    <Button>
      <IssueActionBtn href={`/issues/${issueId}/edit`}>
        <FaRegEdit />
        Edit
      </IssueActionBtn>
    </Button>
  );
}
