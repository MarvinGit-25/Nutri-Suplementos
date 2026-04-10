// auth.config.ts — Edge-compatible config (no Prisma, no Node.js-only imports)
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    trustHost: true,
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.role = (user as { role?: string }).role;
                token.id = user.id as string;
            }
            return token;
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.role = token.role as string | undefined;
                session.user.id = token.id as string;
            }
            return session;
        },
    },
    providers: [], // Providers will be configured in auth.ts (Node.js only)
};
