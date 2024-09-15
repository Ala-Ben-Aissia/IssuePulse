import {getIssue} from "@/app/_lib/data-service";
import {IssueStatusBadge, MarkDown} from "@/app/components";
import {Box, Card, Flex, Heading, Text} from "@radix-ui/themes";

export default async function IssueDetails({
  issueId,
}: {
  issueId: string;
}) {
  const issue = await getIssue(issueId);
  return (
    <Box>
      <Heading>{issue.title}</Heading>
      <Flex gap="3" align="center" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="mt-4">
        <MarkDown issue={issue} />
      </Card>
    </Box>
  );
}
