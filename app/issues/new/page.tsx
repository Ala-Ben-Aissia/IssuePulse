"use client";

import {Button, TextField} from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import {useRouter} from "next/navigation";
import {Controller, useForm} from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";

interface IssueFrom {
  title: string;
  description: string;
}

export default function Page() {
  const {register, control, handleSubmit} = useForm<IssueFrom>();
  const router = useRouter();

  async function submitForm(formData: IssueFrom) {
    await axios.post("/api/issues", formData);
    router.push("/issues");
  }

  return (
    <form
      onSubmit={handleSubmit(submitForm)}
      className="max-w-xl space-y-3"
    >
      <TextField.Root
        placeholder="Title"
        {...register("title", {
          required: true,
        })}
      />
      <Controller
        control={control}
        name="description"
        render={({field}) => <SimpleMdeReact {...field} />}
      />
      <Button type="submit">Submit New Issue</Button>
    </form>
  );
}
