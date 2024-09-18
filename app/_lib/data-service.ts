import {prisma} from "@/prisma/client";
import axios from "axios";
import {notFound} from "next/navigation";
import {wait} from "../utils";
import {issueSchema} from "../validationSchemas";

interface Issue {
  title: string;
  description: string;
}

export async function createIssue(issue: Issue) {
  const validation = issueSchema.safeParse(issue);

  if (!validation.success) {
    throw new Error(`ValidationErrors:
      ${validation.error.errors.map((e) => e.message)}`);
  }

  try {
    await prisma.issue.create({
      data: {
        title: issue.title,
        description: issue.description,
      },
    });
  } catch (e) {
    throw new Error((e as Error).message);
  }
}

export async function getIssues() {
  // await wait(1000);
  try {
    const issues = await prisma.issue.findMany();
    return issues;
  } catch (error) {
    return `Error while fetching Issues: ${error}`;
  }
}

export async function getIssue(issueId: string) {
  const id = Number(issueId);
  if (!id) notFound(); // NaN is falsy (typeof NaN === number)
  const issue = await prisma.issue.findUnique({
    where: {id},
  });
  if (!issue) notFound();
  return issue;
}

export async function getUsers() {
  // await wait(5000);
  try {
    const users = await prisma.user.findMany();
    return users;
  } catch (error) {
    console.log({error});
    throw new Error("Cannot retrieve users !");
  }
}

export async function assignIssue(
  issueId: string,
  userId: string | null
) {
  await wait(500);
  return axios.patch(`/api/issues/${issueId}`, {
    userId: userId,
  });
}
