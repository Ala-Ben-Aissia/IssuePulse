"use client";

import {AlertDialog, Button, Spinner} from "@radix-ui/themes";
import axios from "axios";
import {useRouter} from "next/navigation";
import React from "react";
import {FaTrash} from "react-icons/fa";

export default function DeleteIssueBtn({issueId}: {issueId: string}) {
  const [error, setError] = React.useState(false);
  const [isPending, setIsPending] = React.useState(false);

  const router = useRouter();

  async function handleDelete() {
    try {
      setIsPending(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues");
      router.refresh();
    } catch {
      setIsPending(false);
      setError(true);
    }
  }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">
            <FaTrash />
            Delete Issue {isPending && <Spinner />}
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
                disabled={isPending}
                color="red"
                onClick={handleDelete}
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
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>OoOps 🧐</AlertDialog.Title>
          <AlertDialog.Description className="mb-4">
            An error has occured while deleting this issue
          </AlertDialog.Description>
          <Button
            color="gray"
            variant="soft"
            onClick={() => setError(false)}
          >
            okay!
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
}
