import axios from 'axios'
axios.defaults.withXSRFToken = true

const BASE_URL = "http://localhost:3001/api"

async function fetchRecipes() {
    const endpoint = `${BASE_URL}/dishes`

    try {
        const response = await axios.get(endpoint)
        return response.data
    } catch (err) { throw err }
}

async function fetchRecipeById(id) {
    const endpoint = `${BASE_URL}/dishes/${id}`

    try {
        const response = await axios.get(endpoint)
        return response.data
    } catch (err) { throw err }
}

async function addRecipe(recipe) {
    const endpoint = `${BASE_URL}/dishes`

    try {
        const response = await axios.post(endpoint, recipe)
        return response.data
    } catch (err) { throw err }
}

async function removeRecipe(id) {
    const endpoint = `${BASE_URL}/dishes/${id}`

    try {
        const response = await axios.delete(endpoint)
        return response.data
    } catch (err) { throw err }
}

async function editRecipe(id, recipe) {
    const endpoint = `${BASE_URL}/dishes/${id}`

    try {
        const response = await axios.patch(endpoint, recipe)
        return response.data
    } catch (err) { throw err }
}

export { fetchRecipes, fetchRecipeById, addRecipe, removeRecipe, editRecipe }