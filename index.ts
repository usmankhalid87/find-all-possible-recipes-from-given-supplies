function findAllRecipes(
  recipes: string[],
  ingredients: string[][],
  supplies: string[]
): string[] {
  const availableSupplies = new Set<string>(supplies);
  const availableRecipes = new Map<string, number>(
    recipes.map((name, idx) => [name, idx])
  );
  const seen = new Array<boolean>(recipes.length).fill(false);

  function canBeMade(recipe: string) {
    if (availableSupplies.has(recipe)) return true;
    if (!availableRecipes.has(recipe)) return false;

    const recipeIdx: number = availableRecipes.get(recipe) as number;

    if (seen[recipeIdx]) return false;
    seen[recipeIdx] = true;
    for (let ingredient of ingredients[recipeIdx]) {
      if (!canBeMade(ingredient)) return false;
    }
    availableSupplies.add(recipe);

    return true;
  }

  const ans: string[] = [];

  for (const recipe of recipes) {
    if (canBeMade(recipe)) ans.push(recipe);
  }

  return ans;
}

let recipes = ["bread", "sandwich", "burger"],
  ingredients = [
    ["yeast", "flour"],
    ["bread", "meat"],
    ["sandwich", "meat", "bread"],
  ],
  supplies = ["yeast", "flour", "meat"];

console.log(findAllRecipes(recipes, ingredients, supplies));
