import styles from '@/styles/DishDetails.module.css'
import { fetchRecipeById } from '@/utils/api'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useContext } from 'react';
import { ThemeContext } from '../_app';

function DishDetails({ dish = {} }) {
    const { theme } = useContext(ThemeContext)
    
    return (
        <div className={styles.details} style={theme === "dark" ? {backgroundColor: "#121212", color: "white"} : null}>
            <div className={styles.details__header}>
                <FontAwesomeIcon icon={faArrowLeft} onClick={() => { window.history.back() }}/>
                <h1>Detalles</h1>
            </div>

            <div className={styles.details__image}>
                {dish.image}
            </div>

            <div className={styles.details__description}>
                <p>Receta: {dish.name}</p>
                <p>Descripción: {dish.description}</p>
                <p>Preparación: {dish.preparation}</p>
                <p>Categoria: {dish.type}</p>
            </div>
        </div>
    )
}

export default DishDetails

export async function getServerSideProps(context) {
    const { id } = context.params

    const dish = await fetchRecipeById(id).catch((err) => { return {}})
    return { props: { dish: dish }}
}