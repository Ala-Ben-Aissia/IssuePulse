import {IssueActionBtn} from "@/app/components";
import {Issue, Status} from "@prisma/client";
import {Suspense} from "react";
import {getIssues} from "../_lib/data-service";
import Pagination from "../components/Pagination";
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
  searchParams: {status, page = 1},
}: {
  searchParams: {status?: Status; page: number};
}) {
  const s = status
    ? statusOptions.includes(status)
      ? status
      : "All"
    : "All";
  const issues: Issue[] | string = await getIssues(s);
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
      <Pagination
        itemCount={issues.length}
        pageSize={6}
        currentPage={page}
      />
    </div>
  );
}
