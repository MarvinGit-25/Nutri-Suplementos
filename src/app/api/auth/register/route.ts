import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const MIN_PASSWORD_LENGTH = 12;
const STRONG_PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

function isBootstrapEnabled() {
    // In production require explicit opt-in to prevent accidental public admin bootstrap.
    if (process.env.NODE_ENV === "production") {
        return process.env.ADMIN_BOOTSTRAP_ENABLED === "true";
    }
    return true;
}

// POST /api/auth/register — create admin user (only usable once or when no admin exists)
export async function POST(req: Request) {
    try {
        const { name, email, password, secret } = await req.json();
        const ip = getClientIp(req);

        const rate = checkRateLimit(`admin-bootstrap:${ip}`, {
            limit: 5,
            windowMs: 15 * 60 * 1000,
        });

        if (!rate.allowed) {
            return NextResponse.json(
                { error: "Muitas tentativas. Tente novamente em alguns minutos." },
                { status: 429 }
            );
        }

        if (!isBootstrapEnabled()) {
            return NextResponse.json({ error: "Bootstrap de admin desativado." }, { status: 403 });
        }

        if (!name || !email || !password || !secret) {
            return NextResponse.json({ error: "Dados obrigatórios ausentes." }, { status: 400 });
        }

        // Simple protection: require a setup secret from env
        if (secret !== process.env.ADMIN_SETUP_SECRET) {
            return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
        }

        const existingAdmin = await prisma.user.findFirst({
            where: { role: "ADMIN" },
            select: { id: true },
        });
        if (existingAdmin) {
            return NextResponse.json(
                { error: "Já existe um administrador cadastrado. Bootstrap bloqueado." },
                { status: 409 }
            );
        }

        if (password.length < MIN_PASSWORD_LENGTH || !STRONG_PASSWORD_REGEX.test(password)) {
            return NextResponse.json(
                {
                    error:
                        "Senha fraca. Use pelo menos 12 caracteres com maiúscula, minúscula, número e símbolo.",
                },
                { status: 400 }
            );
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
