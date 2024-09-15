"use client";

import {createIssueSchema} from "@/app/_lib/data-service";
import ErrorMessage from "@/app/components/ErrorMessage";
import {Button, Spinner, TextField} from "@radix-ui/themes";
import MDEditor from "@uiw/react-md-editor";
import axios from "axios";
import {useRouter} from "next/navigation";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function Page() {
  const {register, control, handleSubmit, formState} =
    useForm<IssueForm>();
  const router = useRouter();
  const {
    errors: {title: titleError, description: descError},
  } = formState;

  const [pending, setPending] = React.useState(false);

  function onSubmit() {
    return handleSubmit((formData) => {
      if (pending) return;
      setPending(true);
      axios.post("/api/issues", formData).then(() => {
        router.push("/issues");
      });
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
