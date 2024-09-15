"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import {issueSchema} from "@/app/validationSchemas";
import {Button, Spinner, TextField} from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import {useRouter} from "next/navigation";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";

type IssueForm = z.infer<typeof issueSchema>;

type Props = {
  defaultValues?: IssueForm;
  method?: "post" | "patch";
  issueId?: string;
};

export default function IssueForm({
  defaultValues,
  method = "post",
  issueId,
}: Props) {
  const {register, control, handleSubmit, formState} =
    useForm<IssueForm>({
      defaultValues: method === "patch" ? defaultValues : {},
    });
  const router = useRouter();
  const {
    errors: {title: titleError, description: descError},
  } = formState;

  const [pending, setPending] = React.useState(false);

  function onSubmit() {
    return handleSubmit((formData) => {
      if (pending) return;
      setPending(true);
      axios[method](`/api/issues/${issueId || ""}`, formData).then(
        () => {
          router.push("/issues");
        }
      );
    });
  }

  return (
    <div className="max-w-xl mb-4">
      <form onSubmit={onSubmit()} className="max-w-xl space-y-3">
        <TextField.Root
          placeholder="Title"
          {...register("title", {
            required: "Issue title is required",
          })}
        />
        {<ErrorMessage>{titleError?.message}</ErrorMessage>}
        <Controller
          control={control}
          name="description"
          render={({field}) => (
            <MDEditor
              data-color-mode="light"
              {...register("description", {
                required: "You must describe your issue",
              })}
              {...field}
              // commands={[commands.]}
            />
          )}
        />
        {<ErrorMessage>{descError?.message}</ErrorMessage>}
        <Button type="submit" disabled={pending}>
          Submit New Issue {pending && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
