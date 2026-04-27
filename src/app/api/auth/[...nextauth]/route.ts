import { handlers } from "@/lib/auth";
import { NextResponse } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

export const GET = handlers.GET;

export async function POST(req: Request) {
    const { pathname } = new URL(req.url);

    // Protect credential callback against brute-force attempts.
    if (pathname.includes("/callback/credentials")) {
        const ip = getClientIp(req);
        const rate = checkRateLimit(`credentials-login:${ip}`, {
            limit: 20,
            windowMs: 10 * 60 * 1000,
        });

        if (!rate.allowed) {
            return NextResponse.json(
                { error: "Muitas tentativas de login. Aguarde alguns minutos." },
                { status: 429 }
            );
        }
    }

    return handlers.POST(req);
}
