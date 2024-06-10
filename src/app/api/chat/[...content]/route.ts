import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: { content: string } }) {
  const url = `${process.env.URL && process.env.URL.replace("/api/v1", "")}chat/${params.content}`;
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