import {patchIssueSchema} from "@/app/validationSchemas";
import {auth} from "@/auth";
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

  const session = await auth();
  if (!session) {
    return NextResponse.json("You should log in first!", {
      status: 401,
    });
  }

  const body = await request.json();
  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), {
      status: 400,
    });
  }

  const authenticatedUser = (await auth())?.user;
  const issue = await prisma.issue.findUnique({
    where: {id: Number(issueId)},
  });
  let user;

  if (!issue)
    return NextResponse.json(
      {error: "Issue not found!"},
      {status: 404}
    );

  try {
    if (body.userId) {
      user = await prisma.user.findUnique({
        where: {id: body.userId},
      });

      if (!user)
        return NextResponse.json(
          {error: "User not found!"},
          {status: 400}
        );
      console.log({user, authenticatedUser});
      if (user.id !== authenticatedUser?.id) {
        return NextResponse.json(
          {
            error: "You don not have permission!",
          },
          {status: 403}
        );
      }
    }

    const updatedIssue = await prisma.issue.update({
      where: {id: +issueId},
      data: {
        title: body.title,
        userId: body.userId,
        description: body.description,
      },
    });
    return NextResponse.json(updatedIssue, {status: 200});
  } catch (e) {
    console.log({e});
    return NextResponse.json("Failed to update the issue", {
      status: 500,
    });
  }
}

export async function DELETE(
  request: NextRequest,
  {params: {issueId}}: {params: {issueId: string}}
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json("Gotch ya bitch!", {status: 401});
  }
  try {
    await prisma.issue.delete({where: {id: +issueId}});
    return new Response(null, {status: 204});
  } catch (error) {
    return NextResponse.json("Failed to delete issue", {status: 500});
  }
}
