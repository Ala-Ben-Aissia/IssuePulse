"use client";

import {createIssueSchema} from "@/app/api/issues/route";
import {zodResolver} from "@hookform/resolvers/zod";
import {Button, Text, TextArea, TextField} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import {z} from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

export default function Page() {
  const {register, control, handleSubmit, formState} =
    useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
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
          <Text color="red" as="p">
            {titleError.message}
          </Text>
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
          <Text color="red" as="p">
            Issue description is missing...
          </Text>
        )}
        <Button type="submit">Submit New Issue</Button>
      </form>
    </div>
  );
}
