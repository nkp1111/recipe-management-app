/**
 * 
 * @param {} recipe : recipe details
 * @param {*} Recipe : Recipe table for storing recipe in table
 * @param {*} Ingredient : Ingredient table for storing ingredients in tables
 */
module.exports.createNewRecipe = async (recipe, Recipe, Ingredient) => {

  const { name, description, instructions, ingredients } = recipe

  if (!name) {
    return { error: "Recipe name is not defined" }
  }

  try {
    const recipe = await Recipe.create({
      name,
      description,
      instructions,
    })

    const ingName = ingredients.map(item => ({ name: item, recipeId: recipe.id }))
    const data = await Ingredient.bulkCreate(ingName)
    recipe.ingredients = data
    await recipe.save()
    return { recipe }
  } catch (error) {
    console.log(error)
  }
}


module.exports.getAllRecipes = async (Recipe) => {
  try {
    const recipes = await Recipe.findAll({ include: "ingredients" })
    return recipes
  } catch (error) {
    console.log(error)
  }
}