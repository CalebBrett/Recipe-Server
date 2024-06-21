'use server';

import prisma from "@/lib/prisma";
import { E_Tags } from "@/app/enums";

export async function getRecipesList(filter: string | E_Tags) {
    let recipes: T_Recipe[];
    switch (filter) {
        case E_Tags.meal:
            recipes = await prisma.recipes.findMany({
                where: { tagMeal: true }, orderBy: [{ id: 'desc' }]
            });
            break;
        case E_Tags.breakfast:
            recipes = await prisma.recipes.findMany({
                where: { tagBreakfast: true }, orderBy: [{ id: 'desc' }]
            });
            break;
        case E_Tags.snack:
            recipes = await prisma.recipes.findMany({
                where: { tagSnack: true }, orderBy: [{ id: 'desc' }]
            });
            break;
        case E_Tags.sweet:
            recipes = await prisma.recipes.findMany({
                where: { tagSweet: true }, orderBy: [{ id: 'desc' }]
            });
            break;
        case E_Tags.ingredient:
            recipes = await prisma.recipes.findMany({
                where: { tagIngredient: true }, orderBy: [{ id: 'desc' }]
            });
            break;
        case E_Tags.side:
            recipes = await prisma.recipes.findMany({
                where: { tagSide: true }, orderBy: [{ id: 'desc' }]
            });
            break;
        case E_Tags.fried:
            recipes = await prisma.recipes.findMany({
                where: { tagFried: true }, orderBy: [{ id: 'desc' }]
            });
            break;
        default:
            recipes = await prisma.recipes.findMany({
                where: { name: { contains: filter } }, orderBy: [{ id: 'desc' }]
            });
    }
    return recipes;
}

export async function isNameTaken(name: string, exceptionId?: number) {
    let recipe = await prisma.recipes.findUnique({ where: { name: name } });

    if (recipe == null) {
        return false;
    } else {
        if (exceptionId != undefined && exceptionId == recipe.id) {
            return false;
        } else {
            return true;
        }
    }
}

export async function getRecipe(id: number) {
    let recipe: T_Recipe | null = await prisma.recipes.findUnique({ where: { id: id } });
    return recipe;
}

export async function addRecipe(data: T_Recipe) {
    await prisma.recipes.create({
        data: data,
    });
}

export async function editRecipe(data: T_Recipe) {
    await prisma.recipes.update({
        where: {
            id: data.id,
        },
        data: data,
    });
}

export async function deleteRecipe(id: number) {
    await prisma.recipes.delete({
        where: {
            id: id,
        }
    });
}

export async function backupRecipes() {
    let response = await prisma.recipes.findMany();
    return response;
}

export async function importRecipes(dataList: T_Recipe[]) {
    for (var i = 0; i < dataList.length; i++) {
        dataList[i].id = undefined;
        if (await isNameTaken(dataList[i].name)) {
            await prisma.recipes.update({
                where: {
                    name: dataList[i].name,
                },
                data: dataList[i],
            });
        } else {
            await addRecipe(dataList[i]);
        }
    }
}



// Current
export async function toggleCurrentSelection(data: any) {
    let isSelected = await prisma.current.findUnique({ where: { recipeId: data.recipeId } });
    if (isSelected == null) {
        await prisma.current.create({
            data: data,
        });
    } else {
        await prisma.current.delete({
            where: {
                recipeId: data.recipeId,
            }
        });
    }
}

export async function isSelected(data: any) {
    let isSelected = await prisma.current.findUnique({ where: { recipeId: data.recipeId } });
    if (isSelected == null) {
        return false;
    } else {
        return true;
    }
}

export async function getCurrentCount() {
    let count = await prisma.current.findMany();
    if (count.length != 0) {
        return [count.length, count[0].recipeId];
    }
    return [count.length, -1];
}

export async function getCurrentRecipes() {
    let currentIds = await prisma.current.findMany();
    let currentRecipes = [];
    for (let i = 0; i < currentIds.length; i++) {
        let recipe: T_Recipe | null = await prisma.recipes.findUnique({ where: { id: currentIds[i].recipeId } });
        if (recipe != null) {
            currentRecipes.push(recipe);
        }
    }
    return currentRecipes;
}

export async function clearCurrent() {
    await prisma.current.deleteMany();
}

export async function getNextId(currentId: number, isCyclingForward: boolean) {
    const currentSelections = await prisma.current.findMany();
    const currentIndex = currentSelections.findIndex((value) => { return value.recipeId == currentId; });
    const lastIndex = currentSelections.findLastIndex(() => { return true; });
    if (currentIndex != -1 && lastIndex != -1) {
        if (isCyclingForward) {
            if (currentIndex == lastIndex) {
                return currentSelections.at(0)?.recipeId;
            } else {
                return currentSelections.at(currentIndex + 1)?.recipeId;
            }
        } else {
            if (currentIndex == 0) {
                return currentSelections.at(lastIndex)?.recipeId;
            } else {
                return currentSelections.at(currentIndex - 1)?.recipeId;
            }
        }
    }
    // Pagination -- cleaner solution but doesnt seem to handle wrapping around
    // let takeValue = -1;
    // if (isCyclingForward) {
    //     takeValue = 1;
    // }
    // const NextResult = await prisma.current.findMany({
    //     take: takeValue,
    //     skip: 1,
    //     cursor: {
    //         recipeId: currentId,
    //     }
    // });
    // return NextResult[0].recipeId;
}

export async function getMultiplier(currentRecipeId: number) {
    const result = await prisma.current.findUnique({ where: { recipeId: currentRecipeId } });
    return result?.portionMultiplier;
}

export async function updateMultiplier(currentRecipeId: number, newMultiplier: number) {
    await prisma.current.update({
        where: {
            recipeId: currentRecipeId
        },
        data: { recipeId: currentRecipeId, portionMultiplier: newMultiplier },
    });
}
