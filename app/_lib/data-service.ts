import prisma from "@/prisma/client";
import {z} from "zod";

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
  await new Promise((res) => setTimeout(res, 2000));
  try {
    const issues = await prisma.issue.findMany();
    return issues;
  } catch (error) {
    return `Error while fetching Issues: ${error}`;
  }
}
