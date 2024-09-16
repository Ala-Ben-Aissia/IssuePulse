"use client";

import {AlertDialog, Button} from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";
import {FaTrash} from "react-icons/fa";

export default function DeleteIssueBtn({issueId}: {issueId: string}) {
  const router = useRouter();
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color="red">
          <FaTrash />
          Delete
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content className="flex flex-col">
        <AlertDialog.Title>Confim deletion ?</AlertDialog.Title>
        <AlertDialog.Description className="mb-4">
          Are you sure you want to delete this issue? This action
          cannot be undone
        </AlertDialog.Description>
        <div className="flex gap-10">
          <AlertDialog.Action>
            <Button
              color="red"
              onClick={() =>
                axios.delete(`/api/issues/${issueId}`).then(() => {
                  router.push("/issues");
                  router.refresh();
                })
              }
            >
              <FaTrash />
              Delete
            </Button>
          </AlertDialog.Action>
          <AlertDialog.Cancel>
            <Button
              color="gray"
              variant="soft"
              className="hover:bg-gray-300"
            >
              <FaTrash />
              Cancel
            </Button>
          </AlertDialog.Cancel>
        </div>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
}
