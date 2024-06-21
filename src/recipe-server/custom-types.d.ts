type T_Recipe = {
    id?: number;
    name: string;
    portionNum: number;
    portionDesc: string;
    ingredients: string;
    instructions: string;
    tools: string;
    tagMeal: boolean;
    tagBreakfast: boolean;
    tagSnack: boolean;
    tagSweet: boolean;
    tagIngredient: boolean;
    tagSide: boolean;
    tagFried: boolean;
};

type T_Ingredient = {
    ammount: string;
    measurement: string;
    ingredient: string;
};
