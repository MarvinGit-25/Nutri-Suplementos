import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// POST /api/auth/register — create admin user (only usable once or when no admin exists)
export async function POST(req: Request) {
    try {
        const { name, email, password, secret } = await req.json();

        // Simple protection: require a setup secret from env
        if (secret !== process.env.ADMIN_SETUP_SECRET) {
            return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
        }

        const existing = await prisma.user.findUnique({ where: { email } });
        if (existing) {
            return NextResponse.json({ error: "E-mail já cadastrado." }, { status: 409 });
        }

        const hashed = await bcrypt.hash(password, 12);
        const user = await prisma.user.create({
            data: { name, email, password: hashed, role: "ADMIN" },
        });

        return NextResponse.json({ ok: true, id: user.id });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Erro interno." }, { status: 500 });
    }
}
