import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { getAccessToken } from "@/app/utils/sessionTokenAccessor";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const AllSearchParams = searchParams.toString();
  const session = await getServerSession(authOptions);

  const url = `${process.env.URL}games?${AllSearchParams}`;
  if (session) {
    let accessToken = await getAccessToken(session);
    const resp = await fetch(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      method: "GET",
    });
    if (resp.ok) {
      const data = await resp.json();
      return NextResponse.json({ data }, { status: resp.status });
    } else {
      return NextResponse.json(
        { error: await resp.text() },
        { status: resp.status }
      );
    }
  } else {
    const resp = await fetch(url, {
      method: "GET",
});

    if (resp.ok) {
      const data = await resp.json();
      return NextResponse.json({ data }, { status: resp.status });
    }
    return NextResponse.json(
      { error: await resp.text() },
      { status: resp.status }
    );
  }
}
