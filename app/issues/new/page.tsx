"use client";

import {createIssueSchema} from "@/app/api/issues/route";
import ErrorMessage from "@/app/components/ErrorMessage";
import {Button, TextArea, TextField} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
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

  const mdeProps = {
    ...register("description", {
      required: "You must describe your issue",
    }),
    ref: undefined,
  };

  return (
    <div className="max-w-xl mb-4">
      <form
        onSubmit={handleSubmit((formData) => {
          axios
            .post("/api/issues", formData)
            .then(() => router.push("/issues"));
        })}
        className="max-w-xl space-y-3"
      >
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
          // controlling passed props
          render={({field}) => (
            <TextArea
              {...field}
              {...mdeProps}
              className="h-60"
              placeholder="Describe your issue"
            />
          )}
        />
        {<ErrorMessage>{descError?.message}</ErrorMessage>}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
}
