import {IssueActionBtn} from "@/app/components";
import {FaTrash} from "react-icons/fa";

export default function DeleteIssueBtn({issueId}: {issueId: string}) {
  return (
    <IssueActionBtn color="red" href={`/issues/${issueId}/edit`}>
      <FaTrash />
      Delete Issue
    </IssueActionBtn>
  );
}
