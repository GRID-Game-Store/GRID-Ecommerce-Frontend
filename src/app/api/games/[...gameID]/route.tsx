import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { gameID: string } }) {
  const url = `${process.env.URL}games/${params.gameID}`;
  const resp = await fetch(url, {
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
}
