"use client";

import axios from "axios";
import Link from "next/link";
import { useRef } from "react";

export default function Create() {

  const formRef = useRef();
  // TODO: handle error if protion num blank, reload or set to default of 1
  // TODO: handle error of name not unique
  // TODO: navigate back to home after?
  async function addNewRecipe() {
    const {
      _name,
      _portionNum,
      _portionDesc,
      _ingredients,
      _instructions,
      _tools,
    } = formRef.current;
    const name = _name.value;
    const portionNum = _portionNum.value;
    const portionDesc = _portionDesc.value;
    const ingredients = _ingredients.value;
    const instructions = _instructions.value;
    const tools = _tools.value;
    await axios.post("../api/new", {
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
    <div>
      <div className="header">
        <Link className="button" href="/">
          &lt;-
        </Link>
        <h1>Creating new recipe</h1>
        <div></div>
      </div>
      <div className="forms">
        <form ref={formRef} action={addNewRecipe}>
          <label>
            Name:
            <input type="text" name="_name" className="textInput" />
          </label>
          <label>
            Portion size:
            <input type="number" name="_portionNum" id="numberInput" />
            <input type="text" name="_portionDesc" className="textInput" />
          </label>
          <label>
            Ingredients:
            <textarea name="_ingredients" />
          </label>
          <label>
            Instructions:
            <textarea name="_instructions" />
          </label>
          <label>
            Notes:
            <textarea name="_tools" />
          </label>
          <div className="buttonBox">
            <input type="submit" value="Create" className="submitButton" />
          </div>
        </form>
      </div>
    </div>
  );
};
