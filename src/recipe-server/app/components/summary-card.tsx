"use client";

import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function SummaryCard({ recipe }) {
  var isSelected = false;

  async function selection() {
    console.log(isSelected);
    if (isSelected) {
      await axios.put("../api/current", { id: parseInt(recipe?.id) });
      isSelected = false;
    } else {
      await axios.post("../api/current", { id: parseInt(recipe?.id) });
      isSelected = true;
    }
  }

  return (
    <div className="recipeCard">
      <Link href={"/viewer/" + recipe.id}>
        <Image src={"/foodImages/" + recipe.name + ".jpg"} width={200}
          height={200} />
        <h1>{recipe.name}</h1>
      </Link>
      <Link className="button" href={"/edit/" + recipe.id}>
        Edit
      </Link>
    </div>
  );
};
