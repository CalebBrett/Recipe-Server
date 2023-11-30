"use client";

import axios from "axios";
import { useRef } from "react";
import ImageUpload from "./image-upload";

export default function Form({ recipe }) {
  const formRef = useRef();

  async function deleteRecipe() {
    if (window.confirm("Do you want to delete this recipe?")) {
      await axios.post("../../api/edit", { id: recipe.id });
    }
  }

  async function editRecipe() {
    const {
      _name,
      _portionNum,
      _portionDesc,
      _ingredients,
      _instructions,
      _tools,
    } = formRef.current;
    const id = recipe.id;
    const name = _name.value;
    const portionNum = _portionNum.value;
    const portionDesc = _portionDesc.value;
    const ingredients = _ingredients.value;
    const instructions = _instructions.value;
    const tools = _tools.value;
    await axios.put("../api/edit", {
      id,
      name,
      portionNum,
      portionDesc,
      ingredients,
      instructions,
      tools,
    });
    window.location.reload();
  }

  return (
    <div className="forms">
      <form ref={formRef} action={editRecipe}>
        <label>
          Name:
          <input type="text" name="_name" defaultValue={recipe.name} className="textInput" />
        </label>
        <label>
          Portion size:
          <input type="number" name="_portionNum" defaultValue={recipe.portionNum} id="numberInput" />
          <input type="text" name="_portionDesc" defaultValue={recipe.portionDesc} className="textInput" />
        </label>
        <label>
          Ingredients:
          <textarea name="_ingredients" defaultValue={recipe.ingredients} />
        </label>
        <label>
          Instructions:
          <textarea name="_instructions" defaultValue={recipe.instructions} />
        </label>
        <label>
          Notes:
          <textarea name="_tools" defaultValue={recipe.tools} />
        </label>
        <div className="buttonBox">
          <input type="submit" value="Confirm Edit" className="submitButton" />
          <button type="button" onClick={deleteRecipe} className="submitButton">Delete</button>
        </div>
      </form>
      {/* <ImageUpload name={recipe.name} /> */}
    </div>
  );
};
