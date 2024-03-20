import React, { useEffect } from "react";

import { signOut, useSession } from "next-auth/react";

import { AuthenticationActions } from "../authenticationActions";
import Avatar from "../avatar";

const Authentication = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (
      status !== "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

  return (
    <div>
      {session ? (
        <Avatar name={session.user.name} />
      ) : (
        <AuthenticationActions />
      )}
    </div>
  );
};

export { Authentication };
