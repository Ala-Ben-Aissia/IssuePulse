import {getIssue} from "@/app/_lib/data-service";

interface Props {
  params: {
    issueId: string;
  };
}

export default async function Page({params: {issueId}}: Props) {
  const issue = await getIssue(issueId);

  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </div>
  );
}
