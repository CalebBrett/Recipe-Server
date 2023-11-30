import { NextRequest, NextResponse } from 'next/server';
import fs from "fs";

export async function POST(req: NextRequest) {
    const formData = await req.formData();
    const files = formData.getAll('files') as File[];
    console.log(files);
    /*
      returns [
        {
          name: 'test.jpg',
          type: 'image/jpg',
          size: 1024,
          ...other file props
        }
      ]
    */

    const fileToStorage = files[0];

    // supose you have your Supabase client initialized previously
    await saveFile(fileToStorage);

    return NextResponse.json({ message: 'Files Created' });
}

const saveFile = async (file) => {
    const data = fs.readFileSync(file.path);
    fs.writeFileSync(`./public/${file.name}`, data);
    await fs.unlinkSync(file.path);
    return;
};
