import {getIssue} from "@/app/_lib/data-service";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import MarkDown from "@/app/components/MarkDown";
import {Card, Flex, Text} from "@radix-ui/themes";

interface Props {
  params: {
    issueId: string;
  };
}

export default async function Page({params: {issueId}}: Props) {
  const issue = await getIssue(issueId);

  return (
    <div>
      <h1>{issue.title}</h1>
      <Flex gap="3" align="center" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="mt-4">
        <MarkDown issue={issue} />
      </Card>
      {/* <Card>{issue.description}</Card> */}
    </div>
  );
}
