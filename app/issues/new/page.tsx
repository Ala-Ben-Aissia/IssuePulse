"use client";

import {Button, TextArea, TextField} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";

interface IssueFrom {
  title: string;
  description: string;
}

export default function Page() {
  const {register, control, handleSubmit, formState} =
    useForm<IssueFrom>();
  const router = useRouter();
  const {
    errors: {title: titleError, description: descError},
  } = formState;

  const mdeProps = {
    ...register("description", {
      required: "You must specify your issue description",
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
        {titleError && (
          <li className="text-red-400 text-sm">
            <pre className="inline -ml-2">
              Issue title is missing...
            </pre>
          </li>
        )}
        <Controller
          control={control}
          name="description"
          // controlling passed props
          render={({field}) => (
            <TextArea
              {...field}
              className="h-60"
              placeholder="Describe your issue"
            />
          )}
        />
        {descError && (
          <li className="text-red-400 text-sm">
            <pre className="inline -ml-2">
              Issue description is missing...
            </pre>
          </li>
        )}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
}
