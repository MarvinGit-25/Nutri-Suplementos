import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "Nenhum arquivo enviado." }, { status: 400 });
        }

        // Convert File to Buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to Cloudinary
        const result = await new Promise<{ secure_url: string; public_id: string }>(
            (resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    {
                        folder: "nutrisup/produtos",
                        transformation: [
                            { width: 800, height: 800, crop: "fill", gravity: "center" },
                            { quality: "auto", fetch_format: "auto" },
                        ],
                    },
                    (error, result) => {
                        if (error || !result) return reject(error);
                        resolve(result as { secure_url: string; public_id: string });
                    }
                );
                uploadStream.end(buffer);
            }
        );

        return NextResponse.json({
            url: result.secure_url,
            publicId: result.public_id,
        });
    } catch (error) {
        console.error("[CLOUDINARY_UPLOAD_ERROR]", error);
        return NextResponse.json({ error: "Erro ao fazer upload da imagem." }, { status: 500 });
    }
}



