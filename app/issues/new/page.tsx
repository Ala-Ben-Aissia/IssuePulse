"use client";

import {Button, TextField} from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

export default function Page() {
  return (
    <form className="max-w-xl space-y-3">
      <TextField.Root name="title" placeholder="Title" />
      <SimpleMDE />
      <Button type="submit">Submit New Issue</Button>
    </form>
  );
}
