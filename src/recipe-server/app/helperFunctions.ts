"use client";

import Fraction from "fraction.js";
import { getCurrentRecipes } from '@/app/actions';

export function parseIngredients(_ingredients: string[], _portionMultiplier: number) {
    const measureWords = ["g", "mg", "kg", "cup", "tbsp", "tsp", "ml", "l", "lbs", "oz"];
    let parsedIngredients: T_Ingredient[] = [];

    for (let i = 0; i < _ingredients?.length; i++) {
        let newIngredient: T_Ingredient = { ammount: "", measurement: "", ingredient: "", };

        const parts = _ingredients[i].split(" ");
        if (parts.length >= 2) {
            const maybeAmmount = parts[0];
            const maybeMeasurement = parts[1].toLowerCase();

            if (!isNaN(parseInt(maybeAmmount))) {
                newIngredient.ammount = new Fraction(maybeAmmount).mul(_portionMultiplier).toFraction(true);
                parts.shift();
            } else {
                newIngredient.ammount = (1 * _portionMultiplier).toString() + "x";
            }
            if (measureWords.includes(maybeMeasurement)) {
                newIngredient.measurement = maybeMeasurement;
                parts.shift();
            } else {
                newIngredient.measurement = "";
            }
        } else {
            newIngredient.ammount = "";
            newIngredient.measurement = "";
        }
        newIngredient.ingredient = parts.join(" ");

        // Capitalize first letter of ingredients
        newIngredient.ingredient = newIngredient.ingredient.charAt(0).toUpperCase() + newIngredient.ingredient.slice(1);

        parsedIngredients.push(newIngredient);
    }
    return parsedIngredients;
}

export async function createShoppingList() {
    const currentRecipes: T_Recipe[] = await getCurrentRecipes();
    let items: T_Ingredient[] = [];
    let shoppingList = "";
    currentRecipes.forEach((recipe) => {
        const ingredients = parseIngredients(recipe.ingredients.split("\n"), 1); // TODO: portionMultiplier is always 1 here, maybe add portion scaling here. Could use as muliplier for making the same thing 2-3 times -> integrate with like meal planning weekly stuff
        items = items.concat(ingredients);
    });

    items = sortAndMergeIngredients(items);

    items.forEach((item) => {
        // Remove space if measurement is empty
        if (item.measurement == "") {
            shoppingList = shoppingList + item.ingredient + " (" + item.ammount + "" + item.measurement + ")\n";
        } else {
            shoppingList = shoppingList + item.ingredient + " (" + item.ammount + " " + item.measurement + ")\n";
        }
    });
    console.log(shoppingList);

    try {
        await navigator.clipboard.writeText(shoppingList);
        console.log('Content copied to clipboard');
    } catch (err) {
        console.error('Failed to copy: ', err);
    }
}

function sortAndMergeIngredients(_ingredients: T_Ingredient[]) {
    // Sort alphabetically
    _ingredients.sort((a, b) => (a.ingredient > b.ingredient) ? 1 : ((b.ingredient > a.ingredient) ? -1 : 0));

    // Merge same ingredients
    _ingredients = simpleMerge(_ingredients);
    // advancedMerge(_ingredients);

    // TODO: maybe some kind of fuzzy string search and sort closest so that bread flour and cake flour are sorted together

    return _ingredients;
}

function simpleMerge(_ingredients: T_Ingredient[]) {
    let duplicates = [];
    for (let i = 0; i < _ingredients.length; i++) {
        if (_ingredients.at(i)?.ingredient.toLowerCase() == _ingredients.at(i + 1)?.ingredient.toLowerCase()) {
            duplicates.push(i);
            _ingredients[i + 1].measurement = _ingredients[i + 1].measurement + ", " + _ingredients[i].ammount + " " + _ingredients[i].measurement;
        }
    }
    duplicates.reverse().forEach((index) => {
        _ingredients.splice(index, 1);
    });

    return _ingredients;
}

// Merge duplicates in ingredient list and add the ammounts -- Not used currently, doesnt take measurment type into account (ie cups will merge with tsp), also doesnt handle empty/non numeric ammounts. now that ammount and measurements are not optional prob can remove some checks
function advancedMerge(_ingredients: T_Ingredient[]) {
    let tmp: T_Ingredient[] = [];
    for (let i = 0; i < _ingredients.length; i++) {
        if (_ingredients.at(i)?.ingredient.toLowerCase() == _ingredients.at(i + 1)?.ingredient.toLowerCase()) {
            let cur = _ingredients.at(i)?.ammount;
            let next = _ingredients.at(i + 1)?.ammount;
            if (cur != undefined && next != undefined) {
                if (!isNaN(parseInt(cur)) && !isNaN(parseInt(next))) {
                    let hasX = false;
                    if (cur.endsWith("x")) {
                        cur = cur.slice(0, -1);
                        hasX = true;
                    }
                    if (next.endsWith("x")) {
                        next = next.slice(0, -1);
                        hasX = true;
                    }
                    _ingredients[i + 1].ammount = new Fraction(cur).add(next).toFraction(true);
                    if (hasX) {
                        _ingredients[i + 1].ammount = _ingredients[i + 1].ammount + "x";
                    }
                }
            }
        } else {
            tmp.push(_ingredients[i]);
        }
    }
    console.log(tmp);
    return tmp;
}