"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { getMultiplier, getNextId, getRecipe } from '@/app/actions';
import View from "@/app/components/view";

export default function Viewer({ params }: any) {
  const router = useRouter();
  const [Recipe, setRecipe] = useState<[T_Recipe, number]>([{
    name: "",
    portionNum: -1,
    portionDesc: "",
    ingredients: "",
    instructions: "",
    tools: "",
    tagMeal: false,
    tagBreakfast: false,
    tagSnack: false,
    tagSweet: false,
    tagIngredient: false,
    tagSide: false,
    tagFried: false,
  }, 1]);

  let isInitialized = false;
  async function init() {
    if (!isInitialized) {
      isInitialized = true;
      const recipe = await getRecipe(parseInt(params.id));
      const multiplier = await getMultiplier(parseInt(params.id));
      if (recipe != null && multiplier != undefined) {
        setRecipe([recipe, multiplier]);
        document.addEventListener("keydown", moveToNextRecipe);
      } else {
        router.push("/");
      }
    }
  };
  useEffect(() => {
    init(); return () => {
      document.removeEventListener("keydown", moveToNextRecipe);
    };
  }, []);

  async function moveToNextRecipe(e: any) {
    if (e.repeat) { return; }
    let id = parseInt(params.id);
    if (e.keyCode == 74) {
      const nextPageId = await getNextId(id, false);
      router.push("/viewer/" + nextPageId);
    } else if (e.keyCode == 75) {
      const nextPageId = await getNextId(id, true);
      router.push("/viewer/" + nextPageId);
    }
  }

  if (Recipe[0].id != undefined) {
    return (
      <div>
        <div className="header" id="keyDownHook">
          <Link className="link leftLink" href="/">
            &lt;
          </Link>
          <h2>{Recipe[0].name}</h2>
          <div>
            {/* TODO: done? */}
          </div>
        </div>
        <View params={Recipe} />
      </div>
    );
  } else { return; }
};
