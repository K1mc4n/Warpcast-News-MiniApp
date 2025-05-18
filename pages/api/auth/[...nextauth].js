import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Warpcast",
      credentials: {
        clientId: { label: "Client ID", type: "text" },
        clientSecret: { label: "Client Secret", type: "password" }
      },
      authorize: async (credentials) => {
        try {
          const res = await fetch("https://api.warpcast.com/oauth/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              client_id: credentials.clientId,
              client_secret: credentials.clientSecret,
              grant_type: "client_credentials"
            })
          });

          const user = await res.json();
          if (user && user.access_token) {
            return user;
          }
          return null;
        } catch (error) {
          console.error("OAuth Error:", error);
          return null;
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  }
});
