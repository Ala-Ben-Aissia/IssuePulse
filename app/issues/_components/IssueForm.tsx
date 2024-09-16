"use client";

import ErrorMessage from "@/app/components/ErrorMessage";
import {issueSchema} from "@/app/validationSchemas";
import {Issue} from "@prisma/client";
import {Button, Spinner, TextField} from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import {useRouter} from "next/navigation";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";

type IssueForm = z.infer<typeof issueSchema>;

export default function IssueForm({issue}: {issue?: Issue}) {
  const router = useRouter();

  const {register, control, handleSubmit, formState} =
    useForm<IssueForm>();

  const {
    errors: {title: titleError, description: descError},
  } = formState;

  const [pending, setPending] = React.useState(false);

  function onSubmit() {
    return handleSubmit(async (formData: IssueForm) => {
      if (pending) return;
      setPending(true);
      if (!issue) {
        await axios.post("/api/issues", formData);
      } else {
        await axios.patch(`/api/issues/${issue.id}`, formData);
      }
      router.push("/issues");
      router.refresh(); // refreshes '/issues'
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
          defaultValue={issue?.title}
        />
        {<ErrorMessage>{titleError?.message}</ErrorMessage>}
        <Controller
          control={control}
          name="description"
          defaultValue={issue?.description}
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
          {issue ? "Edit" : "Submit New"} Issue{" "}
          {pending && <Spinner />}
        </Button>
      </form>
    </div>
  );
}
