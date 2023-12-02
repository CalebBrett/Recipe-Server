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
        <Image className="recipeImage" src={"/foodImages/" + recipe.name + ".jpg"} width={9999}
          height={9999} />
        <h3>{recipe.name}</h3>
      </Link>
      <Link className="button" href={"/edit/" + recipe.id}>
        <Image className="icon" src="/icons/edit.png" width={9999}
          height={9999} alt="Edit" />
      </Link>
    </div>
  );
};
