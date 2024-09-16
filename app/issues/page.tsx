import {IssueActionBtn} from "@/app/components";
import {Suspense} from "react";
import IssueList from "./IssueList";
import IssueListFallback from "./issueListFallback";

export const revalidate = 0;

export default async function Page() {
  return (
    <div>
      <div className="mb-5">
        <IssueActionBtn href="/issues/new">New Issue</IssueActionBtn>
      </div>
      <Suspense fallback={<IssueListFallback />}>
        <IssueList />
      </Suspense>
    </div>
  );
}
