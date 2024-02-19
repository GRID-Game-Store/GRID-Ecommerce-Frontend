import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';

import { authOptions } from '../auth/[...nextauth]/route';
import { getAccessToken } from '@/app/utils/sessionTokenAccessor';

export async function POST(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get('id')
  const session = await getServerSession(authOptions);
  if (session) {
    const url = `${process.env.URL}cart/add/${id}`;
    let accessToken = await getAccessToken();
    
   
    const resp = await fetch(url, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
      method: "POST",
    });
    console.log(accessToken);
    
    
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
