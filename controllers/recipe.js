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

module.exports.getRecipeDetail = async (recipeId, Recipe) => {
  try {
    const recipe = await Recipe.findByPk(+recipeId, { include: "ingredients" })
    return { recipe }
  } catch (error) {
    console.log(error)
    return { error: "Error Fetching Recipe Detail" }
  }
}


module.exports.addRecipeIngredients = async (recipeId, ingredientsName, Recipe, Ingredient) => {
  try {
    const recipe = await Recipe.findByPk(recipeId, { include: "ingredients" })
    if (!recipe) {
      return { error: "Recipe Not Found" }
    }
    const newIngredients = ingredientsName.map(item => ({ name: item, recipeId }))
    const data = await Ingredient.bulkCreate(newIngredients)
    recipe.ingredients.push(data)
    const updatedRecipe = await recipe.save()
    return { recipe }
  } catch (error) {
    console.log(error)
    return { error: "Error adding new ingredients" }
  }
}


module.exports.removeRecipeIngredients = async (recipeId, ids, Recipe, Ingredient) => {
  try {
    const removedIngredientIds = []
    const recipe = await Recipe.findByPk(recipeId, { include: "ingredients" })
    if (!recipe) {
      return { error: "Recipe Not Found" }
    } else if (!recipe.ingredients) {
      return { error: "Recipes ingredients not found" }
    }
    const filteredRecipeIng = recipe.ingredients.filter(item => {
      if (!ids.includes(item.id)) {
        return item
      } else {
        removedIngredientIds.push(item.id)
      }
    })

    const removedCount = recipe.ingredients.length - filteredRecipeIng.length

    console.log(removedIngredientIds)
    await Ingredient.destroy({
      where: {
        id: removedIngredientIds
      }
    })

    recipe.ingredients = filteredRecipeIng
    await recipe.save()
    return { success: `Remove ${removedCount} ingredients`, recipe }
  } catch (error) {
    console.log(error)
    return { error: "Error Removing ingredients" }
  }
}


module.exports.updateRecipeInfo = async (recipeId, name, description, instruction, Recipe) => {
  if (!name && !description && !instruction) {
    return { error: "Nothing to Change" }
  }
  try {
    const newInfo = {}
    if (name) newInfo["name"] = name
    if (description) newInfo["description"] = description
    if (instruction) newInfo["instruction"] = instruction

    await Recipe.update(newInfo, { where: { id: recipeId } })

    return { success: `Successfully Updated Recipe with id ${recipeId}` }

  } catch (error) {
    console.log(error)
    return { error: "Error updating Recipe" }
  }
}