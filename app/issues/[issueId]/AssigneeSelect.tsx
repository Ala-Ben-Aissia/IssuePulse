"use client";

import {assignIssue} from "@/app/_lib/data-service";
import {Skeleton} from "@/app/components";
import {Issue} from "@prisma/client";
import {Select} from "@radix-ui/themes";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";
import {User} from "next-auth";
import toast, {Toaster} from "react-hot-toast";

// let appUsers: User[];

// const usersPromise = getUsers().then(async (u) => {
//   await wait(4000);
//   appUsers = u;
// });

export default function AssigneeSelect({
  users: usersSC,
  issue,
}: {
  users: User[];
  issue: Issue;
}) {
  // const USERS = users ?? appUsers;
  // if (!appUsers) {
  //   throw usersPromise;
  // }

  // const [usersX, setUsersX] = React.useState<User[]>([]);

  // React.useEffect(() => {
  //   axios.get<User[]>("/api/users").then(({data}) => setUsersX(data));
  // }, []);]

  // if (!usersX.length) return <Skeleton height="31px" />;

  const {data: users, status} = useUsers();

  switch (status) {
    case "pending":
      return <Skeleton height="32px" />;

    case "error":
      // return (
      //   <pre className="whitespace-pre-wrap text-red-400">
      //     {error.message}
      //   </pre>
      // );
      return;

    case "success":
      const issueUser = users.find((u) => u.id === issue.userId);

      return (
        <>
          <Select.Root
            defaultValue={issue.userId ?? "null"}
            onValueChange={(userId) => {
              const id = userId === "null" ? null : userId;
              const toastId = toast.loading("loading...");
              assignIssue(issue.id + "", id)
                .then(() => {
                  toast.remove(toastId);
                  id
                    ? toast.success(
                        `Issue assigned to ${issueUser?.name}`
                      )
                    : toast.success("Issue has been unassigned");
                })
                .catch(() => {
                  toast.error("Changes could not be saved!");
                });
            }}
          >
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
              <Select.Group>
                <Select.Label className="font-extrabold">
                  Users
                </Select.Label>
                <Select.Item value="null">Unassigned</Select.Item>
                {users.map((user) => (
                  <Select.Item
                    key={user.id}
                    value={user.id as string}
                  >
                    {user.name}
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Content>
          </Select.Root>
          <Toaster />
        </>
      );

    default:
      return "This should be impossible1";
  }
}

function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: () => axios.get("/api/users").then((res) => res.data),
    staleTime: 60000, // refetch users every minute
    retry: 3, // 3 retries in addition to the first request
  });
}
