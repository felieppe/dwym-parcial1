import Dish from '@/components/dish'
import styles from '../styles/Home.module.css'
import { useContext, useEffect, useState } from 'react'
import { fetchRecipes } from '@/utils/api'
import { ThemeContext } from './_app'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons'

function Home({ endpointDishes = {} }) {
    const [dishes, setDishes] = useState(endpointDishes)
    const [filter, setFilter] = useState(dishes)
    const { theme, setTheme } = useContext(ThemeContext)

    const onRecipeRemove = (id) => {
        setDishes(dishes.filter(dish => dish.id !== id))
        setFilter(filter.filter(dish => dish.id !== id))
    }

    const handleAdd = () => { window.location.href = '/add' }

    const handleFilter = (e) => {
        setFilter(dishes.filter(dish => dish.type.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    const handleThemeChange = () => {
        setTheme(theme == "light" ? "dark" : "light")
    }

    useEffect(() => {
        console.log("test")
    }, [theme])

    return (
        <>
            <div className={styles.dishes} style={theme === "dark" ? {backgroundColor: "#121212", color: "white"} : null}>
                <div className={styles.dishes__header}>
                    <h1 style={{color: theme == "dark" ? "white" : null}}>Recetas</h1>

                    <div className={styles.dishes__header__group}>
                        <button onClick={handleAdd}>Nueva Receta</button>
                        <FontAwesomeIcon icon={theme == "light" ? faMoon : faSun} onClick={handleThemeChange}/>
                    </div>
                </div>

                <div className={styles.dishes__filter}>
                    <input type="text" placeholder="Buscar tipo de receta" onChange={handleFilter}/>
                </div>

                <div className={styles.dishes__showcase}>
                    {filter.map(dish => (
                        <Dish key={dish.id} id={dish.id} recipe={dish.name} food={dish.type} img={dish.image} onRemove={onRecipeRemove} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default Home

export async function getServerSideProps() {
    const dishes = await fetchRecipes().catch((err) => { return [] })
    return { props: { endpointDishes: (dishes != undefined ? dishes : []) }}
}