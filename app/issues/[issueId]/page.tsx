import React from "react";
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
    <div className="grid gap-4 sm:grid-cols-2">
      {/* <Grid columns={{initial: "1", md: "2"}} gap="5"> */}
      <React.Suspense fallback={<IssueDetailsFallback />}>
        <IssueDetails issueId={issueId} />
      </React.Suspense>
      <div>
        <EditIssueBtn issueId={issueId} />
      </div>
    </div>
  );
}
