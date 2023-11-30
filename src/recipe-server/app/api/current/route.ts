import prisma from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();
  const result = await prisma.current.create({
    data: {
      recipeId: data.id,
    },
  });
  return NextResponse.json(result);
}

export async function PUT(req, res) {
  const data = await req.json();
  const result = await prisma.current.deleteMany({
    where: {
      recipeId: data.id,
    },
  });
  return NextResponse.json(result);
}
