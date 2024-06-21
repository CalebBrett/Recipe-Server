"use client";

import Link from "next/link";
import { useRef } from "react";
import { addRecipe, isNameTaken } from '@/app/actions';

export default function Create() {
  const formRef = useRef();

  async function onFormSubmit() {
    const {
      _name,
      _portionNum,
      _portionDesc,
      _ingredients,
      _instructions,
      _tools,
      _tagMeal,
      _tagBreakfast,
      _tagSnack,
      _tagSweet,
      _tagIngredient,
      _tagSide,
      _tagFried
    }: any = formRef.current;

    const recipe: T_Recipe = {
      name: _name.value,
      portionNum: parseInt(_portionNum.value),
      portionDesc: _portionDesc.value,
      ingredients: _ingredients.value,
      instructions: _instructions.value,
      tools: _tools.value,
      tagMeal: _tagMeal.checked,
      tagBreakfast: _tagBreakfast.checked,
      tagSnack: _tagSnack.checked,
      tagSweet: _tagSweet.checked,
      tagIngredient: _tagIngredient.checked,
      tagSide: _tagSide.checked,
      tagFried: _tagFried.checked
    };

    // Validate data before sending query
    if (Number.isNaN(recipe.portionNum)) {
      alert("Set Portion Size!");
      return;
    }
    if (await isNameTaken(recipe.name)) {
      alert("Name in use!");
      return;
    }

    // Send query and reload page to clear form
    await addRecipe(recipe);

    window.location.reload();
  }

  return (
    <div>
      <div className="header">
        <Link className="link leftLink" href="/">
          &lt;
        </Link>
        <h2>Creating new recipe</h2>
        <Link className="link rightLink" href="/backup">
          Backup
        </Link>
      </div>
      <div className="forms">
        <form ref={formRef} action={onFormSubmit}>
          <label className="textInput">
            <p>Name:</p>
            <input type="text" name="_name" />
          </label>
          <label className="textInput">
            <p>Portion size:</p>
            <input type="number" name="_portionNum" id="numberInput" />
            <input type="text" name="_portionDesc" />
          </label>
          <label>
            Instructions:
            <textarea name="_instructions" />
          </label>
          <label>
            Ingredients:
            <textarea name="_ingredients" />
          </label>
          <label>
            Tags:
            <div className="tagSelection">
              <input type="checkbox" name="_tagMeal" />
              Meal
              <input type="checkbox" name="_tagBreakfast" />
              Breakfast
              <input type="checkbox" name="_tagSweet" />
              Sweet
              <input type="checkbox" name="_tagSnack" />
              Snack
              <input type="checkbox" name="_tagIngredient" />
              Ingredient
              <input type="checkbox" name="_tagSide" />
              Side
              <input type="checkbox" name="_tagFried" />
              Fried
            </div>
          </label>
          <label>
            Notes:
            <textarea name="_tools" id="notes" />
          </label>
          <div className="buttonBox">
            <input type="submit" value="Create" className="link" />
          </div>
        </form>
      </div>
    </div>
  );
};
