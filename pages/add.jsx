import styles from '@/styles/Add.module.css'
import { addRecipe } from '@/utils/api';
import { useContext, useEffect, useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

import { ThemeContext } from './_app';

function Add() {
    const [preview, setPreview] = useState(null)
    const { theme } = useContext(ThemeContext)

    const handleSubmit = (e) => {
        e.preventDefault()

        const image = e.target.image.value
        const name = e.target.name.value
        const description = e.target.description.value
        const preparation = e.target.preparation.value
        const type = e.target.type.value

        const recipe = {
            name,
            description,
            type,
            image,
            preparation
        }

        addRecipe(recipe).then(() => { window.location.href = '/' })
    }

    const onImageChange = (e) => { setPreview(e.target.value) }
    const handleBack = () => { window.history.back() }

    useEffect(() => {
        console.log(theme)
    }, [theme])

    return (
        <div className={styles.add} style={theme == "dark" ? {backgroundColor: "#121212", color: "white"} : null}>
            <div className={styles.add__header}>
                <FontAwesomeIcon icon={faArrowLeft} onClick={handleBack}/>
                <h1>Agregar</h1>
            </div>

            <div className={styles.add__preview}>
                {preview}
            </div>

            <form className={styles.add__form} onSubmit={handleSubmit}>
                <label htmlFor="image">Imagen</label> <br />
                <input type="text" id="image" name="image" maxLength={2} onChange={onImageChange}/> <br />

                <label htmlFor="name">Receta</label> <br />
                <input type="text" id="name" name="name" /> <br />

                <label htmlFor="description">Descripción</label> <br />
                <textarea id="description" name="description" /> <br />

                <label htmlFor="preparation">Preparación</label> <br />
                <textarea id="preparation" name="preparation" /> <br />

                <label htmlFor="type">Categoria</label> <br />
                <input type="text" id="type" name="type" /> <br />

                <button type="submit">Agregar</button>
            </form>
        </div>
    )
}

export default Add;