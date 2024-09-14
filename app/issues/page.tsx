import {Issue} from "@prisma/client";
import {Table} from "@radix-ui/themes";
import Link from "next/link";
import {getIssues} from "../_lib/data-service";
import IssueActionBtn from "../components/IssueActionBtn";
import IssueStatusBadge from "../components/IssueStatusBadge";

export default async function Page() {
  const data: Issue[] | string = await getIssues();
  if (typeof data === "string") {
    throw new Error(data);
  }

  return (
    <div>
      <div className="mb-5">
        <IssueActionBtn>
          <Link href={"/issues/new"}>New Issue</Link>
        </IssueActionBtn>
      </div>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Status
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell className="hidden md:table-cell">
              Create at
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({id, title, status, createdAt}) => (
            <Table.Row key={id}>
              <Table.Cell>
                <Link href={`/issues/${id}`}>{title}</Link>
                <div className="block md:hidden">
                  <IssueStatusBadge status={status} />
                </div>
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                <IssueStatusBadge status={status} />
              </Table.Cell>
              <Table.Cell className="hidden md:table-cell">
                {createdAt.toDateString()}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
}
