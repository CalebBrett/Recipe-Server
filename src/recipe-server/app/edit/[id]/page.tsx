"use client";

import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { getRecipe, editRecipe, deleteRecipe, isNameTaken } from '@/app/actions';
// import ImageUpload from "./image-upload";

export default function Edit({ params }: any) {
  const router = useRouter();
  const formRef = useRef();
  const [Recipe, setRecipe] = useState<T_Recipe>({
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
  });

  async function init() {
    const recipe = await getRecipe(parseInt(params.id));
    if (recipe != null) {
      setRecipe(recipe);
    } else {
      router.push("/");
    }
  };
  useEffect(() => { init(); }, []);

  async function onDelete() {
    if (Recipe.id != undefined) {
      if (window.confirm("Do you want to delete this recipe?")) {
        await deleteRecipe(Recipe.id);
        router.push("/");
      }
    }
  }

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
      _tagFried,
    }: any = formRef.current;

    const new_recipe: T_Recipe = {
      id: Recipe.id,
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
    if (Number.isNaN(new_recipe.portionNum)) {
      alert("Set Portion Size!");
      return;
    }
    if (await isNameTaken(new_recipe.name, new_recipe.id)) {
      alert("Name in use!");
      return;
    }

    // Send query and reload page to clear form
    await editRecipe(new_recipe);

    window.location.reload();
  }

  if (Recipe.id != undefined) {
    return (
      <div>
        <div className="header">
          <Link className="link leftLink" href="/">
            &lt;
          </Link>
          <h2>Editing {Recipe?.name} recipe</h2>
          <div></div>
        </div>
        <div className="forms">
          <form ref={formRef} action={onFormSubmit}>
            <label className="textInput">
              <p>Name:</p>
              <input type="text" name="_name" defaultValue={Recipe.name} />
            </label>
            <label className="textInput">
              <p>Portion size:</p>
              <input type="number" name="_portionNum" defaultValue={Recipe.portionNum} id="numberInput" />
              <input type="text" name="_portionDesc" defaultValue={Recipe.portionDesc} />
            </label>
            <label>
              Instructions:
              <textarea name="_instructions" defaultValue={Recipe.instructions} className="mainTextareas" />
            </label>
            <label>
              Ingredients:
              <textarea name="_ingredients" defaultValue={Recipe.ingredients} className="mainTextareas" />
            </label>
            <label>
              Tags:
              <div className="tagSelection">
                <input type="checkbox" name="_tagMeal" defaultChecked={Recipe.tagMeal} />
                Meal
                <input type="checkbox" name="_tagBreakfast" defaultChecked={Recipe.tagBreakfast} />
                Breakfast
                <input type="checkbox" name="_tagSweet" defaultChecked={Recipe.tagSweet} />
                Sweet
                <input type="checkbox" name="_tagSnack" defaultChecked={Recipe.tagSnack} />
                Snack
                <input type="checkbox" name="_tagIngredient" defaultChecked={Recipe.tagIngredient} />
                Ingredient
                <input type="checkbox" name="_tagSide" defaultChecked={Recipe.tagSide} />
                Side
                <input type="checkbox" name="_tagFried" defaultChecked={Recipe.tagFried} />
                Fried
              </div>
            </label>
            <label>
              Notes:
              <textarea name="_tools" defaultValue={Recipe.tools} id="notes" />
            </label>
            <div className="buttonBox">
              <input type="submit" value="Confirm Edit" className="link" />
              <button type="button" onClick={onDelete} className="link">Delete</button>
            </div>
          </form>
          {/* <ImageUpload name={recipe.name} /> */}
        </div>
      </div>
    );
  } else { return; }
};
