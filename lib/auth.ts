import NextAuth, { type NextAuthConfig } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

// Extend the session user type to include isGuest flag
declare module "next-auth" {
  interface User {
    isGuest?: boolean;
  }
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isGuest?: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    isGuest?: boolean;
  }
}

export const authOptions: NextAuthConfig = {
  // cookies: {
  //   sessionToken: {
  //     name: process.env.NODE_ENV === "production"
  //       ? "__Secure-authjs.session-token"
  //       : "authjs.session-token",
  //     options: {
  //       httpOnly: true,
  //       sameSite: "lax",
  //       path: "/",
  //       secure: process.env.NODE_ENV === "production",
  //     },
  //   },
  // },
  // useSecureCookies: process.env.NODE_ENV === "production",
  providers: [
    CredentialsProvider({
      name: "Guest Login",
      async authorize() {
        return {
          id: process.env.GUEST_ID,
          name: "Guest",
          email: "guest@webmellon.local",
          image: "",
          isGuest: true, // Flag for permission checks
        };
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      authorization: {
        params: {
          scope: "read:user user:email",
        },
      },
      profile(profile) {
        let email = profile.email;

        if (!email && Array.isArray(profile.emails)) {
          const primary = profile.emails.find((e) => e.primary && e.verified);
          const fallback = profile.emails.find((e) => e.verified);
          email = primary?.email || fallback?.email || null;
        }

        // Fallback email for users with private GitHub emails
        // Uses GitHub's noreply email format
        if (!email) {
          email = `${profile.id}+${profile.login}@users.noreply.github.com`;
        }

        return {
          id: profile.id?.toString(),
          name: profile.name || profile.login,
          email,
          image: profile.avatar_url,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  trustHost: true,
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
    // Guest sessions expire faster (1 hour) for security
    maxAge: 24 * 60 * 60, // 24 hours for regular users
  },
  callbacks: {
    async session({ session, token }) {
      if (token?.sub && session.user) {
        session.user.id = token.sub;
        session.user.isGuest = token.isGuest ?? false;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isGuest = user.isGuest ?? false;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/error",
  },
};

export const { auth, handlers, signIn, signOut } = NextAuth(authOptions);
