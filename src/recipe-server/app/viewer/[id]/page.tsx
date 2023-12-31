import Link from "next/link";
import View from "@/app/components/view";
import prisma from "@/lib/prisma";

export default async function Viewer({ params }) {
  const recipe = await prisma.recipes.findUnique({ where: { id: parseInt(params.id) } });

  return (
    <div>
      <div className="header">
        <Link className="link" href="/">
          &lt;
        </Link>
        <h2>{recipe?.name}</h2>
        {/* <div className="filters">
          <button>recip 1</button>
          <button onClick={setId}>bourrito</button>
          <button>rice</button>
          <button>bean</button>
        </div> */}
        <div></div>
      </div>
      <View recipe={recipe} />
    </div>
  );
};
