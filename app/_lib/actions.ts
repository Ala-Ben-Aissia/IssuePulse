"use server";

import {signIn} from "@/auth";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {createIssue} from "./data-service";

export async function createIssueAction(
  desc: string,
  formData: FormData
) {
  const title = formData.get("title") as string;
  await createIssue({title, description: desc});

  revalidatePath("/issues");
  redirect("/issues");
}

export async function signInAction() {
  await signIn("google", {redirectTo: "/issues"});
}
