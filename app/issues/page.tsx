import {IssueActionBtn} from "@/app/components";
import {Issue, Status} from "@prisma/client";
import {Suspense} from "react";
import {getIssues} from "../_lib/data-service";
import IssueList from "./IssueList";
import IssueListFallback from "./issueListFallback";
import IssueStatusFilter from "./IssueStatusFilter";

export const statusOptions: Status[] = [
  "CLOSED",
  "IN_PROGRESS",
  "OPEN",
];

export const revalidate = 0;

export default async function Page({
  searchParams: {status, sortBy},
}: {
  searchParams: {status?: Status; sortBy?: keyof Issue};
}) {
  const s = status
    ? statusOptions.includes(status)
      ? status
      : "All"
    : "All";
  const issues: Issue[] | string = await getIssues(s, sortBy);
  if (typeof issues === "string") {
    throw new Error(issues);
  }

  return (
    <div>
      <div className="mb-5 flex justify-between">
        <IssueStatusFilter defaultStatus={s} />
        <IssueActionBtn href="/issues/new">New Issue</IssueActionBtn>
      </div>
      <Suspense fallback={<IssueListFallback />}>
        <IssueList issues={issues} />
      </Suspense>
    </div>
  );
}
