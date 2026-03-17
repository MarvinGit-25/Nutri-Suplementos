// auth.ts — Full auth config with Prisma (Node.js only, NOT imported by middleware)
import NextAuth, { DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "@/lib/auth.config";
import bcrypt from "bcryptjs";

// Extend NextAuth types to include 'role'
declare module "next-auth" {
    interface User {
        role?: string;
    }
    interface Session {
        user: {
            role?: string;
            id?: string;
        } & DefaultSession["user"];
    }
}

const getUserByEmail = async (email: string) => {
    const { prisma } = await import("@/lib/prisma");
    return prisma.user.findUnique({ where: { email } });
};

export const { handlers, signIn, signOut, auth } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            name: "Credenciais",
            credentials: {
                email: { label: "E-mail", type: "email" },
                password: { label: "Senha", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) return null;

                const user = await getUserByEmail(credentials.email as string);

                if (!user || !user.password) return null;

                const passwordMatch = await bcrypt.compare(
                    credentials.password as string,
                    user.password
                );

                if (!passwordMatch) return null;

                return {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),
    ],
});
