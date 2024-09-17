"use client";

import {Select} from "@radix-ui/themes";
import {User} from "next-auth";

// let appUsers: User[];

// const usersPromise = getUsers().then(async (u) => {
//   await wait(4000);
//   appUsers = u;
// });

export default function AssigneeSelect({users}: {users: User[]}) {
  // const USERS = users ?? appUsers;
  // if (!appUsers) {
  //   throw usersPromise;
  // }

  // const [usersX, setUsersX] = React.useState<User[]>([]);

  // React.useEffect(() => {
  //   axios.get<User[]>("/api/users").then(({data}) => setUsersX(data));
  // }, []);

  // if (!usersX.length) return <Skeleton height="31px" />;

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
