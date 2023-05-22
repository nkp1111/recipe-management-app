

module.exports.updateIngredientInfo = async (recipeId, ingredientId, name, description, quantity, Recipe, Ingredient) => {

  if (!name && !description && !quantity) {
    return { error: "Nothing to change" }
  }

  try {
    const recipe = await Recipe.findByPk(recipeId, { include: "ingredients" })

    const isIngredient = recipe.ingredients.find(item => item.id === ingredientId)
    if (!isIngredient) {
      return { error: "Ingredient Not Found" }
    }

    const changeInfo = {}
    if (name) changeInfo["name"] = name
    if (description) changeInfo["description"] = description
    if (quantity) changeInfo["quantity"] = quantity

    await Ingredient.update(changeInfo, { where: { id: ingredientId } })

    return { success: `Successfully updated ${recipe.name} recipe ingredient.` }
  } catch (error) {
    console.log(error)
    return { error: "Error while Updating Ingredient" }
  }
}