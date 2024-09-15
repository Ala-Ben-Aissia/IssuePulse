import {getIssue} from "@/app/_lib/data-service";
import {IssueActionBtn} from "@/app/components";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import MarkDown from "@/app/components/MarkDown";
import {Box, Card, Flex, Heading, Text} from "@radix-ui/themes";
import {FaRegEdit} from "react-icons/fa";

interface Props {
  params: {
    issueId: string;
  };
}

export default async function Page({params: {issueId}}: Props) {
  const issue = await getIssue(issueId);

  return (
    <div className="grid gap-4 sm:grid-cols-2">
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
      <div>
        <IssueActionBtn href={`/issues/${issue.id}/edit`}>
          <FaRegEdit className="inline" />
          Edit Issue
        </IssueActionBtn>
      </div>
    </div>
  );
}
