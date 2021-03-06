import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
// import { refreshAccessToken } from "spotify-web-api-node/src/server-methods";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("refreshedToken", refreshedToken);
    return {
      ...token,
      accessToken: refreshedToken.access_token,
      // 1 hour as 3600 returns from spotify API
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      // Replace if new one came back else fall back to old refresh token
      refreshedToken: refreshedToken.refresh_token ?? token.refreshedToken,
    };
  } catch (err) {
    console.error(err);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account, user }) {
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
          // we are handling expiry times in Milliseceonds * 1000
        };
      }
      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        console.log("Returning previous token");
        return token;
      }

      // Access token has expired, so we need to refresh it
      console.log("Refreshing token");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshedToken;
      session.user.username = token.username;

      return session;
    },
  },
});
