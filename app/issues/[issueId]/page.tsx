import {auth} from "@/auth";
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

export default async function Page({params: {issueId}}: Props) {
  const session = await auth();

  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Box className="md:col-span-4">
        <React.Suspense fallback={<IssueDetailsFallback />}>
          <IssueDetails issueId={issueId} />
        </React.Suspense>
      </Box>
      {!!session?.user && (
        <Box>
          <Flex direction="column" gap="4" className="md:col-span-2">
            <EditIssueBtn issueId={issueId} />
            <DeleteIssueBtn issueId={issueId} />
          </Flex>
        </Box>
      )}
    </div>
  );
}
