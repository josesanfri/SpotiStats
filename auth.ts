import NextAuth, { Session } from "next-auth"
import Spotify from "next-auth/providers/spotify"
import { JWT } from "next-auth/jwt"
import { Provider } from "next-auth/providers"

export interface ISession extends Session {
    accessToken?: string
}

interface IJWT extends JWT {
    accessToken?: string
}

const providers: Provider[] = [
    Spotify({
        clientId: process.env.SPOTIFY_CLIENT_ID,        
        clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
        authorization: {
            url: "https://accounts.spotify.com/authorize",
            params: {
                response_type: "code",
                scope: "user-top-read playlist-modify-public playlist-modify-private user-read-private user-read-recently-played"
            },
        }
    }),
]
 
export const { handlers, auth, signIn, signOut } = NextAuth({
    providers,
    callbacks: {
        jwt: async ({token, account }) => {
            if(account?.provider === "spotify") {
                return {
                    ...token, accessToken: account.access_token
                }
            }
            return token
        },
        async session({session, token}: {session: ISession, token: IJWT}) {
            session.accessToken = token.accessToken
            return session
        }
    },
})