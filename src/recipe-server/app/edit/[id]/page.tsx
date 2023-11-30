import Link from "next/link";
import prisma from "@/lib/prisma";
import Form from "@/app/components/form";

export default async function Viewer({ params }) {
  const recipe = await prisma.recipes.findUnique({ where: { id: parseInt(params.id) } });

  return (
    <div>
      <div className="header">
        <Link className="button" href="/">
          &lt;-
        </Link>
        <h1>Editing {recipe?.name} recipe</h1>
        <div></div>
      </div>
      <Form recipe={recipe} />
    </div>
  );
};
