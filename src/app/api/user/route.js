import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {
    const url = `http://localhost:8082/api/v1/users/test`;
    let accessToken = session.access_token

    const resp = await fetch(url, {
      headers: {

        Authorization: "Bearer " + accessToken,
      },
      method: "GET",

    });

    if (resp.ok) {
    
      const data = await resp.json();
      console.log( NextResponse.json({ data }, { status: resp.status }));
      return NextResponse.json({ data }, { status: resp.status });
    }
    
    return NextResponse.json(
      { error: await resp.text() },
      { status: resp.status }
    );
  }
  return NextResponse.json({ error: "Unauthorized" }, { status: res.status });
}