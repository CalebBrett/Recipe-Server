'use client';

import Link from "next/link";
import { useState, useEffect } from 'react';
import { getRecipesList, getCurrentCount, clearCurrent } from '@/app/actions';
import { createShoppingList } from '@/app/helperFunctions';
import { E_Tags } from "@/app/enums";
import SummaryCard from "@/app/components/summary-card";

export default function Home() {
  const [RecipesList, setRecipesList] = useState<T_Recipe[]>([]);
  const [SelectedCount, setSelectedCount] = useState([0, -1]);
  let upButton: any = null;

  let isInitialized = false;
  async function init() {
    if (!isInitialized) {
      isInitialized = true;
      updateSelectedCount();
      setRecipesList(await getRecipesList(""));
      upButton = document.getElementById("upButton");
      window.onscroll = function () { scrollFunction(); };
    }
  };
  useEffect(() => { init(); }, []);

  async function updateSelectedCount() {
    let data = await getCurrentCount();
    setSelectedCount(data);
  }

  function updateCountCallback() {
    updateSelectedCount();
  }

  async function clearSelected() {
    await clearCurrent();
    window.location.reload();
  }

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      if (upButton != null)
        upButton.style.display = "block";
    } else {
      if (upButton != null)
        upButton.style.display = "none";
    }
  }
  // Scroll to the top of the page
  function toTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  return (
    <>
      <div className="header">
        <Link className="link leftLink computerOnly" href="/create">
          New
        </Link>
        <input type="search" placeholder="⌕" onChange={async (event) => {
          setRecipesList(await getRecipesList(event.target.value));
        }} />
        <div className="selectedOptionsContainer">
          <button onClick={createShoppingList} className="link rightLink computerOnly">
            List
          </button>
          <button onClick={clearSelected} className="link rightLink">
            X
          </button>
          <Link className="link rightLink" href={SelectedCount[0] == 0 ? "/" : "/viewer/" + SelectedCount[1]}>
            ({SelectedCount[0]}) Cook
          </Link>
        </div>
      </div>
      <div className="filter-container">
        <div className="filters">
          <button onClick={async () => { setRecipesList(await getRecipesList(E_Tags.meal)); }}>
            Meals
          </button>
          <button onClick={async () => { setRecipesList(await getRecipesList(E_Tags.breakfast)); }}>
            Breakfast
          </button>
          <button onClick={async () => { setRecipesList(await getRecipesList(E_Tags.snack)); }}>
            Snacks
          </button>
          <button onClick={async () => { setRecipesList(await getRecipesList(E_Tags.sweet)); }}>
            Sweets
          </button>
          <button onClick={async () => { setRecipesList(await getRecipesList(E_Tags.ingredient)); }}>
            Ingredients
          </button>
          <button onClick={async () => { setRecipesList(await getRecipesList(E_Tags.side)); }}>
            Sides
          </button>
          <button onClick={async () => { setRecipesList(await getRecipesList(E_Tags.fried)); }}>
            Fried
          </button>
          <button onClick={async () => { setRecipesList(await getRecipesList("")); }}>
            X
          </button>
        </div>
      </div>
      <div id="list">
        {RecipesList.map((recipe, index) => (
          <SummaryCard recipe={recipe} updateCountCallback={updateCountCallback} key={index} />
        ))}
      </div>
      <button onClick={() => { toTop(); }} id="upButton" className="link">^</button>
      <div id="footer"></div>
    </>
  );
}
