import { jwtDecode } from 'jwt-decode';
import NextAuth, { AuthOptions } from 'next-auth';
import KeycloakProvider from 'next-auth/providers/keycloak';

// this will refresh an expired access token, when needed


export const authOptions: AuthOptions   = {
    providers: [
        KeycloakProvider({
          clientId:  `${process.env.KEYCLOAK_CLIENT_ID}`,
          clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
          issuer: `${process.env.KEYCLOAK_ISSUER}`,
        })
    ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        // account is only available the first time this callback is called on a new session (after the user signs in)
        token.decoded = account.access_token && jwtDecode(account.access_token) as string[];
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at  = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if ( nowTimeStamp <  (token.expires_at as number)  ) {
        // token has not expired yet, return it
        return token;
      } else {
        // token is expired, try to refresh it
        console.log("Token has expired. Will refresh...")
        // try {
        //   const refreshedToken = await refreshAccessToken(token);
        //   console.log("Token is refreshed.")
        //   return refreshedToken;
        // } catch (error) {
        //   console.error("Error refreshing access token", error);
        //   return { ...token, error: "RefreshAccessTokenError" };
        // }
        return token;
      }
    },
    
    async session({ session, token }  )   {
   
      session.access_token = token.access_token as string
      session.id_token = token.id_token as number;  
      session.roles = token.decoded?.realm_access?.roles;
      session.error = token.error;      
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };