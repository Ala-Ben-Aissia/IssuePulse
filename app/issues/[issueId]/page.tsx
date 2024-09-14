import {getIssue} from "@/app/_lib/data-service";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";

interface Props {
  params: {
    issueId: string;
  };
}

export default async function Page({params: {issueId}}: Props) {
  const issue = await getIssue(issueId);

  return (
    <div>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" align="center" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>{issue.description}</Card>
    </div>
  );
}
