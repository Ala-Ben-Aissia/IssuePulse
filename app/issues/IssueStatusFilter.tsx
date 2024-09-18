"use client";

import {Select} from "@radix-ui/themes";
import {useRouter} from "next/navigation";

const statusOptions = ["All", "CLOSED", "IN_PROGRESS", "OPEN"];

export default function IssueStatusFilter({
  defaultStatus,
}: {
  defaultStatus: string;
}) {
  const router = useRouter();
  console.log({defaultStatus});

  return (
    <Select.Root
      defaultValue={defaultStatus}
      onValueChange={(status: string) => {
        if (!statusOptions.includes(status)) {
          router.push(`/issues`);
        } else {
          router.push(`/issues?status=${status}`);
        }
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statusOptions.map((s) => (
          <Select.Item key={s} value={s}>
            {s.replaceAll("_", " ")}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
