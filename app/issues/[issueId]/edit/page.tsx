import {getIssue} from "@/app/_lib/data-service";
import IssueForm from "../../_components/IssueForm";

type Props = {
  params: {issueId: string};
};

export default async function Page({params: {issueId}}: Props) {
  const issue = await getIssue(issueId);

  return <IssueForm issue={issue} />;
}
