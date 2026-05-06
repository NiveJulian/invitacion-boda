import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // Configuración interna para asegurar lectura de .env
  cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  if (!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ error: "Faltan credenciales (API KEY o SECRET) en el .env" }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: "No se proporcionó ningún archivo" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Promise((resolve) => {
      cloudinary.uploader.upload_stream(
        { 
          resource_type: 'auto', 
          folder: 'comprobantes_boda',
          api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
          api_secret: process.env.CLOUDINARY_API_SECRET,
          cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            resolve(NextResponse.json({ error: "Error al subir a Cloudinary" }, { status: 500 }));
          } else {
            resolve(NextResponse.json({ url: result?.secure_url }));
          }
        }
      ).end(buffer);
    });

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 });
  }
}
