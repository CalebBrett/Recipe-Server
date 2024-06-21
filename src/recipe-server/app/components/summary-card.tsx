"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { isSelected, toggleCurrentSelection } from '@/app/actions';
import ImageWithFallback from "@/app/components/imageFallback";
import bg from '../../public/paper4.png';

export default function SummaryCard({ recipe, updateCountCallback }: { recipe: T_Recipe; updateCountCallback: Function; }) {
  const backgroundOffsets = ["left", "center", "right", "top", "bottom"];
  const [IsSelected, setIsSelected] = useState(false);

  async function init() {
    setIsSelected(await isSelected({ recipeId: recipe.id }));
  };
  init();

  async function selection() {
    if (recipe.id != undefined) {
      await toggleCurrentSelection({ recipeId: recipe.id });
      setIsSelected(!IsSelected);
      updateCountCallback();
    }
  }

  return (
    <div onClick={selection} className={IsSelected ? "recipeCard selected" : "recipeCard"}
    // style={{ backgroundPosition: backgroundOffsets[Math.floor(Math.random() * 5)], backgroundImage: `url(${bg.src})` }}
    >
      {/* <ImageWithFallback className="recipeImage" src={"/foodImages/" + recipe.name + ".jpg"} width={9999}
        height={9999} alt="" /> */}
      <h3>{recipe.name}</h3>
      <Link className="button computerOnly" href={"/edit/" + recipe.id}>
        <Image className="icon" src="/icons/edit.png" width={100}
          height={100} alt="Edit" />
      </Link>
    </div>
    // </Link>
  );
};
