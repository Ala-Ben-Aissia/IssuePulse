import {issueSchema} from "@/app/validationSchemas";
import {prisma} from "@/prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function PATCH(
  request: NextRequest,
  {params: {issueId}}: {params: {issueId: string}}
) {
  // if (!Number(issueId))
  //   return NextResponse.json("Invalid URL!!!", {
  //     status: 400,
  //   });
  // this is useless because the params is handled in the server from a server component (edit page) and passed to the client IssueForm component so whatever issueId the user puts (in url) will be omitted

  // I should've added some sanitization

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }

  try {
    const issue = await prisma.issue.findUnique({
      where: {id: Number(issueId)},
    });
    if (!issue)
      return NextResponse.json(
        {error: "Issue not found!"},
        {status: 404}
      );
    const updatedIssue = await prisma.issue.update({
      where: {id: parseInt(issueId)},
      data: {
        title: body.title,
        description: body.description,
      },
    });
    return NextResponse.json(updatedIssue, {status: 200});
  } catch (e) {
    return NextResponse.json("Failed to update the issue", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  {params: {issueId}}: {params: {issueId: string}}
) {
  try {
    await prisma.issue.delete({where: {id: +issueId}});
    return new Response(null, {status: 204});
  } catch (error) {
    return NextResponse.json("Failed to delete issue", {status: 500});
  }
}
