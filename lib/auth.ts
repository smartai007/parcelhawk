import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email?.trim() || !credentials?.password) {
          return null;
        }
        const [user] = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.trim().toLowerCase()))
          .limit(1);
        if (!user) return null;
        const match = await compare(credentials.password, user.password);
        if (!match) return null;
        return {
          id: user.id,
          email: user.email,
          name: [user.firstName, user.lastName].filter(Boolean).join(" ") || user.email,
          image: null,
          role: user.role,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone ?? null,
          location: user.location ?? null,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
        token.firstName = (user as { firstName?: string }).firstName;
        token.lastName = (user as { lastName?: string }).lastName;
        token.phone = (user as { phone?: string | null }).phone ?? null;
        token.location = (user as { location?: string | null }).location ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { firstName?: string }).firstName = token.firstName as string;
        (session.user as { lastName?: string }).lastName = token.lastName as string;
        (session.user as { phone?: string | null }).phone = token.phone ?? null;
        (session.user as { location?: string | null }).location = token.location ?? null;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/", // or your sign-in page path
  },
  secret: process.env.NEXTAUTH_SECRET,
};
