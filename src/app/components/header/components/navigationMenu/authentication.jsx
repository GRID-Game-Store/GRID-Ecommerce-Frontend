import React, { useEffect } from 'react';

import {
  signOut,
  useSession,
} from 'next-auth/react';

import { useQuery } from '@tanstack/react-query';

import { AuthenticationActions } from '../authenticationActions';
import Avatar from '../avatar';

const Authentication = () => {
  const { data: session, status } = useSession();
  
  const { data, isSuccess, isLoading, isFetched, isError } = useQuery({
      queryKey: ["auth"],
      queryFn: async () => await fetch(`/api/user`, { method: "GET" })
    });
  useEffect(() => {
    if (
      status != "loading" &&
      session &&
      session?.error === "RefreshAccessTokenError"
    ) {
      signOut({ callbackUrl: "/" });
    }
  }, [session, status]);

 

  return (
    <div>{session ? <Avatar name={session.user.name} /> : <AuthenticationActions />}</div>
  );
};

export { Authentication };
