import {Box, Flex} from "@radix-ui/themes";
import React from "react";
import DeleteIssueBtn from "./DeleteIssueBtn";
import EditIssueBtn from "./EditIssueBtn";
import IssueDetails from "./issueDetails";
import IssueDetailsFallback from "./IssueDetailsFallback";

interface Params {
  issueId: string;
}

interface Props {
  params: Params;
}

export default function Page({params: {issueId}}: Props) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Box className="md:col-span-4">
        <React.Suspense fallback={<IssueDetailsFallback />}>
          <IssueDetails issueId={issueId} />
        </React.Suspense>
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueBtn issueId={issueId} />
          <DeleteIssueBtn issueId={issueId} />
        </Flex>
      </Box>
    </div>
  );
}
