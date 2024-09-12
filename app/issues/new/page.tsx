import {Button, TextArea, TextField} from "@radix-ui/themes";

export default function Page() {
  return (
    <form className="max-w-xl space-y-3">
      <TextField.Root name="title" placeholder="Search the docs…" />
      <TextArea placeholder="Reply to comment…" />
      <Button type="submit">Submit New Issue</Button>
    </form>
  );
}
