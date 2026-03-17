// auth.config.ts — Edge-compatible config (no Prisma, no Node.js-only imports)
import type { NextAuthConfig } from "next-auth";

export const authConfig: NextAuthConfig = {
    pages: {
        signIn: "/login",
    },
    callbacks: {
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");

            if (isAdminRoute) {
                if (!isLoggedIn) return false; // Redirect to signIn
                const role = (auth?.user as { role?: string })?.role;
                if (role !== "ADMIN") return Response.redirect(new URL("/", nextUrl));
                return true;
            }
            return true;
        },
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
