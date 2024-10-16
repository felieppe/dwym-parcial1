import { removeRecipe } from '@/utils/api';
import styles from '../styles/components/Dish.module.css'

import Link from 'next/link';

function Dish({ id, img, recipe, food, onRemove }) {
    const handleRemove = () => {
        removeRecipe(id).then(() => { onRemove(id) })
    }

    const handleEdit = () => {
        window.location.href = `/edit/${id}`
    }

    return (
        <div className={styles.dish}>
            <div className={styles.dish__photo}>
                {img}
            </div>

            <div className={styles.dish__details}>
                <p>Receta: {recipe}</p>
                <p>Comida: {food}</p>
            </div>

            <div className={styles.dish__options}>
                <button><Link href={`/dish/${id}`}>Detalles</Link></button>
                <div className={styles.options__group}>
                    <button onClick={handleEdit}>Editar</button>
                    <button onClick={handleRemove}>Eliminar</button>
                </div>
            </div>
        </div>
    )
}

export default Dish;