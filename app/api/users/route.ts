import {getUsers} from "@/app/_lib/data-service";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
  try {
    const users = await getUsers();
    return NextResponse.json(users, {status: 200});
  } catch (error) {
    console.log({error});
    return NextResponse.json("Failed to retrieve users!", {
      status: 500,
    });
  }
}
