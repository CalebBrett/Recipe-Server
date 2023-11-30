import prisma from "@/lib/prisma";
import Link from "next/link";
import SummaryCard from "@/app/components/summary-card";

async function RecipesList() {
  let recipes = await prisma.recipes.findMany();

  return (
    <div id="list">
      {recipes.map((recipe) => {
        return <SummaryCard recipe={recipe} />;
      })}
    </div>
  );
}

export default function Home() {
  var current = 0;

  async function getCurrentCount() {
    current = await prisma.current.count();
    return current;
  }

  return (
    <>
      <div className="header">
        <Link className="button" href="/create">
          New
        </Link>
        <input type="search" />
        <div></div>
        {/* <Link className="button" href={"/viewer/" + recipe.id}>
          ({getCurrentCount()}) Cook -&gt;
        </Link> */}
      </div>
      <div className="filters">
        <button>Meals</button>
        <button>Breakfast</button>
        <button>Snacks</button>
        <button>Sweets</button>
      </div>
      <RecipesList />
    </>
  );
}
