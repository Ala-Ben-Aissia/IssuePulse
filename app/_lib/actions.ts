"use server";

import {redirect} from "next/navigation";
import {createIssue} from "./data-service";

export async function createIssueAction(
  desc: string,
  formData: FormData
) {
  const title = formData.get("title") as string;

  await createIssue({title, description: desc});

  redirect("/issues");
}
