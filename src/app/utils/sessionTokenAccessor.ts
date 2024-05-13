import { Session, getServerSession } from "next-auth";

import { decrypt } from "./encryption";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function getAccessToken(sessionFromRequest?: Session) {
  let session = sessionFromRequest || await getServerSession(authOptions);
  if (session) {
    const accessTokenDecrypted = decrypt(session.access_token);
    return accessTokenDecrypted;
  }
  return null;
}

export async function getIdToken(sessionFromRequest?: Session) {
  let session = sessionFromRequest || await getServerSession(authOptions);
  if (session) {
    const idTokenDecrypted = decrypt(session.id_token?.toString());

    return idTokenDecrypted;
  }
  return null;
}
