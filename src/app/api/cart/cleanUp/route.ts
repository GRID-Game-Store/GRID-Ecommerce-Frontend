import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { getAccessToken } from "@/app/utils/sessionTokenAccessor";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE() {
  const session = await getServerSession(authOptions);
  if (session) {
    const url = `${process.env.URL}cart/cleanup`;
    let accessToken = await getAccessToken();

    const resp = await fetch(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      method: "DELETE",
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
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}
