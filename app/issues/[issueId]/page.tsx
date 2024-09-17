import {wait} from "@/app/utils";
import {auth} from "@/auth";
import {prisma} from "@/prisma/client";
import {User} from "@prisma/client";
import {Box, Flex, Select} from "@radix-ui/themes";
import React from "react";
import Skeleton from "react-loading-skeleton";
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

let users: User[];

const usersPromise = prisma.user.findMany().then(async (u) => {
  await wait(2000);
  users = u;
});

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
            <React.Suspense fallback={<Skeleton height="32px" />}>
              <AssigneeSelect />
            </React.Suspense>
            <EditIssueBtn issueId={issueId} />
            <DeleteIssueBtn issueId={issueId} />
          </Flex>
        </Box>
      )}
    </div>
  );
}

function AssigneeSelect() {
  if (!users) {
    throw usersPromise;
  }

  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          {users.map((user) => (
            <Select.Item key={user.id} value="1">
              {user.name}
            </Select.Item>
          ))}
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}
