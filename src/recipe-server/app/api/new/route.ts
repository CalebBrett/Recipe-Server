import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req, res) {
  const data = await req.json();
  const result = await prisma.recipes.create({
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
