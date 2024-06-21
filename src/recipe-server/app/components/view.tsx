"use client";

import { useState } from "react";
import Image from "next/image";
import { updateMultiplier } from '@/app/actions';
import { parseIngredients } from '@/app/helperFunctions';

export default function View({ params }: { params: [T_Recipe, number]; }) {
    const recipe = params[0];
    const [portionMultiplier, setPortionMultiplier] = useState(params[1]);

    async function modifyPortion(isUp: boolean) {
        if (recipe.id != undefined) {
            if (isUp) {
                await updateMultiplier(recipe.id, portionMultiplier + 1);
                setPortionMultiplier(portionMultiplier + 1);
            } else {
                if (portionMultiplier > 1) {
                    await updateMultiplier(recipe.id, portionMultiplier - 1);
                    setPortionMultiplier(portionMultiplier - 1);
                }
            }
        }
    }



    if (recipe.id != undefined) {

        const ingredients = parseIngredients(recipe.ingredients.split("\n"), portionMultiplier);
        const instructions = recipe.instructions.split("\n");
        const tools = recipe.tools.split("\n");
        const isInstructionsLonger = (instructions.length + tools.length > ingredients.length);

        return (
            <div id="view">
                <div id="ingredients" className={isInstructionsLonger ? "" : "tallIng"}>
                    {/* <h2>Ingredients</h2> */}
                    <div id="portionButtons">
                        {recipe.portionNum * portionMultiplier + " " + recipe.portionDesc}
                        <button onClick={() => modifyPortion(true)}>+</button>
                        <button onClick={() => modifyPortion(false)}>−</button>
                    </div>
                    <ul>
                        {ingredients?.map((item, index) => {
                            if (item.measurement == "tbsp" || item.measurement == "tsp") {
                                return <li key={index}>
                                    {item.ammount + " "}
                                    <Image className="icon" src={"/icons/" + item.measurement + ".png"} width={100}
                                        height={100} alt={item.measurement} />
                                    {" " + item.ingredient}
                                </li>;
                            } else {
                                return <li key={index}>
                                    {item.ammount + " " + item.measurement + " " + item.ingredient}
                                </li>;
                            }
                        })}
                    </ul>
                </div>
                <div id="instructionsContainer" className={isInstructionsLonger ? "tallIns" : ""}>
                    <ul id="notesList" className={(tools[0] == "") ? "noNotes" : ""} >
                        Notes:
                        {tools?.map((tool, index) => {
                            if (tool != "")
                                return <li key={index}>{tool}</li>;
                        })}
                    </ul>
                    {/* <h2>Instructions</h2> */}
                    <ol id="instructions">
                        {instructions?.map((step, index) => {
                            return <li key={index}>{step}</li>;
                        })}
                    </ol>
                </div>
            </div>
        );
    } else { return; }
};
