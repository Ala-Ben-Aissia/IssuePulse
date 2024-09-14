import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {z} from "zod";
import {wait} from "./utils";

interface Issue {
  title: string;
  description: string;
}

const createIssueSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().min(1),
});

export async function createIssue(issue: Issue) {
  const validation = createIssueSchema.safeParse(issue);

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
  await wait(1000);
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
