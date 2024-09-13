"use client";

import {createIssueAction} from "@/app/_lib/actions";
import {Button, TextField} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import React from "react";
import {Controller, useForm} from "react-hook-form";
import SimpleMdeReact from "react-simplemde-editor";

interface IssueFrom {
  title: string;
  description: string;
}

export default function Page() {
  const {register, control} = useForm<IssueFrom>();
  const [desc, setDesc] = React.useState("");

  return (
    <form
      action={createIssueAction.bind(null, desc)}
      className="max-w-xl space-y-3"
    >
      <TextField.Root placeholder="Title" {...register("title")} />
      <Controller
        control={control}
        name="description"
        render={({field}) => (
          <SimpleMdeReact
            {...field}
            value={desc}
            onChange={(e) => setDesc(e)}
          />
        )}
      />
      <Button type="submit">Submit New Issue</Button>
    </form>
  );
}
