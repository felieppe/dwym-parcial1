import styles from '@/styles/Edit.module.css'

import { editRecipe, fetchRecipeById } from '@/utils/api';
import { useContext, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../_app';

function Edit({ dish = {} }) {
    const [preview, setPreview] = useState(dish.image)
    const [newDish, setNewDish] = useState(dish)
    const { theme } = useContext(ThemeContext)

    const onImageChange = (e) => { setPreview(e.target.value); setNewDish({ ...newDish, image: e.target.value }) }

    const handleSubmit = (e) => {
        e.preventDefault()

        const image = e.target.image.value
        const name = e.target.name.value
        const description = e.target.description.value
        const preparation = e.target.preparation.value
        const type = e.target.type.value

        const recipe = {}

        if (image !== dish.image) recipe.image = image
        if (name !== dish.name) recipe.name = name
        if (description !== dish.description) recipe.description = description
        if (preparation !== dish.preparation) recipe.preparation = preparation
        if (type !== dish.type) recipe.type = type

        const isDifferent = Object.keys(recipe).some((key) => recipe[key] !== dish[key])
        if (isDifferent && Object.keys(recipe).length > 0) {
            console.log(recipe)

            editRecipe(dish.id, recipe).then(() => { window.location.href = '/' })
        } else { alert("No se ha modificado ningún campo") }
    }

    return (
        <div className={styles.edit} style={theme === "dark" ? {backgroundColor: "#121212", color: "white"} : null}>
            <div className={styles.edit__header}>
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => { window.history.back() }}/>
                <h1>Editar</h1>
            </div>

            <div className={styles.edit__preview}>
                {preview}
            </div>

            <form className={styles.edit__form} onSubmit={handleSubmit}>
                <label htmlFor="image">Imagen</label> <br />
                <input type="text" id="image" name="image" maxLength={2} onChange={onImageChange} value={newDish.image} /> <br />

                <label htmlFor="name">Receta</label> <br />
                <input type="text" id="name" name="name" value={newDish.name} onChange={(e) => { setNewDish({ ...newDish, name: e.target.value }) }}/> <br />

                <label htmlFor="description">Descripción</label> <br />
                <textarea id="description" name="description" value={newDish.description} onChange={(e) => { setNewDish({ ...newDish, description: e.target.value }) }} /> <br />

                <label htmlFor="preparation">Preparación</label> <br />
                <textarea id="preparation" name="preparation" value={newDish.preparation} onChange={(e) => { setNewDish({ ...newDish, preparation: e.target.value }) }}/> <br />

                <label htmlFor="type">Categoria</label> <br />
                <input type="text" id="type" name="type" value={newDish.type} onChange={(e) => { setNewDish({ ...newDish, type: e.target.value }) }}/> <br />

                <button type="submit">Editar</button>
            </form>
        </div>
    )

}

export default Edit;

export async function getServerSideProps(context) {
    const { id } = context.params

    const dish = await fetchRecipeById(id).catch((err) => { return {}})
    return { props: { dish: dish }}
}