import { getServerSession } from 'next-auth';

import { authOptions } from '../[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session) {
    // this will log out the user on Keycloak side
    let url = `${process.env.END_SESSION_URL}?id_token_hint=${session.access_token}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL!)}`;
    try {
      const resp = await fetch(url, { method: "GET" });
    } catch (err) {
      console.error(err);
      return new Response(null,{ status: 500 });
    }
  }
  return new Response(null,{ status: 200 });
}