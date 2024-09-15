import {issueSchema} from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }

  try {
    const newIssue = await prisma.issue.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(newIssue, {status: 201});
  } catch (e) {
    return NextResponse.json(e, {status: 500});
  }
}

export async function GET() {
  try {
    const issues = await prisma.issue.findMany();
    return NextResponse.json(issues, {status: 200});
  } catch (e) {
    return NextResponse.json(`Error while fetching issues: ${e}`, {
      status: 500,
    });
  }
}
