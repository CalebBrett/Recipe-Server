import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, res) {
  const data = await req.json();
  const result = await prisma.recipes.update({
    where: {
      id: data.id,
    },
    data: {
      name: data.name,
      portionNum: parseInt(data.portionNum),
      portionDesc: data.portionDesc,
      ingredients: data.ingredients,
      instructions: data.instructions,
      tools: data.tools,
    },
  });
  return NextResponse.json(result);
}

export async function POST(req, res) {
  const data = await req.json();
  console.log(data);
  const result = await prisma.recipes.delete({
    where: {
      id: data.id,
    },
  });
  return NextResponse.json(result);
}
