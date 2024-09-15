import {IssueActionBtn} from "@/app/components";
import {FaRegEdit} from "react-icons/fa";

export default function EditIssueBtn({issueId}: {issueId: string}) {
  return (
    <IssueActionBtn href={`/issues/${issueId}/edit`}>
      <FaRegEdit className="inline" />
      Edit Issue
    </IssueActionBtn>
  );
}
