"use client";

import { ReactNode, useState } from "react";

export default function View({ recipe }) {
    const [portionMultiplyer, setPortionMultiplyer] = useState(1);
    const ingredients = recipe?.ingredients.split("\n");
    let sizeList = new Array(ingredients?.length);
    for (let i = 0; i < ingredients?.length; i++) {
        sizeList[i] = ingredients[i].split(" ")[0].split("/");
        if (isNaN(parseInt(sizeList[i]))) {
            sizeList[i] = ["1"];
        } else {
            ingredients[i] = ingredients[i].split(" ");
            ingredients[i][0] = "";
            ingredients[i] = ingredients[i].join(' ');
        }
        if (sizeList[i].length == 2) {
            sizeList[i] = [sizeList[0], "/", sizeList[1]];
        }
    }
    const instructions = recipe?.instructions.split("\n");
    const tools = recipe?.tools.split("\n");
    let isInstructionsLonger = (instructions.length > ingredients.length + tools.length);
    //TODO: check if recipe undef and return not found.

    function simplifyFraction(fraction) {
        let num = fraction[0] * portionMultiplyer;
        let den = fraction[2];
        if (num < den) {
            return num + "/" + den;
        } else if (num % den == 0) {
            return Math.floor(num / den);
        } else {
            return Math.floor(num / den) + " & " + (num % den) + "/" + den;
            // TODO: better formatting 
            // return Math.floor(num / den) + "" + <sup>(num % den)</sup>&frasl;<sub>den</sub>;
        }
    }

    function modifyPortion(isUp: boolean) {
        if (isUp) {
            setPortionMultiplyer(portionMultiplyer + 1);
        } else {
            if (portionMultiplyer > 1) {
                setPortionMultiplyer(portionMultiplyer - 1);
            }
        }
    }

    return (
        <div id="view">
            <div id="ingredients" className={isInstructionsLonger ? "" : "tallIng"}>
                <div id="portionButtons">
                    <h2>Ingredients</h2>
                    <button onClick={() => modifyPortion(true)}>+</button>
                    <button onClick={() => modifyPortion(false)}>−</button>
                </div>
                {recipe?.portionNum * portionMultiplyer + " " + recipe?.portionDesc}
                <ul>
                    {ingredients?.map((item, index) => {
                        return <li key={item}>{isNaN(sizeList[index] * portionMultiplyer) ? simplifyFraction(sizeList[index]) : sizeList[index] * portionMultiplyer} {item}</li>;
                    })}
                </ul>
                <h2 id="notes">Notes</h2>
                <ul>
                    {tools?.map((tool) => {
                        return <li key={tool}>{tool}</li>;
                    })}
                </ul>
            </div>
            <div id="instructions" className={isInstructionsLonger ? "tallIns" : ""}>
                <h2>Instructions</h2>
                <ul>
                    {instructions?.map((step) => {
                        return <li key={step}>{step}</li>;
                    })}
                </ul>
            </div>
        </div>
    );
};
