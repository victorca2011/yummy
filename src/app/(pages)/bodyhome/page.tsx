"use client"

import axios from 'axios';
import styles from './bodyhome.module.css'
import { PiChefHatDuotone, PiTimerFill, PiCookingPotFill, PiStarFill } from "react-icons/pi";
import { useEffect, useState } from 'react';
import Button from '@/app/components/button/button';

interface RecipesProps {
    id: string; // ou number, dependendo do seu modelo
    recipe_name: string;
    ingredients: string;
    preparation: string;
    time: string;
    image: string;
}

export default function BodyHome() {
    const [data, setData] = useState<RecipesProps>([])
    function getRecipes() {
        axios.get<RecipesProps>('http://localhost:3333/recipe')
            .then(res => setData(res.data))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getRecipes();

    }, [])
    const filteredRecipes = data.filter(recipe => parseInt(recipe.time.replace('min', '')) <= 15)
        .map(recipe => {
            return {
                ...recipe,
                time: parseInt(recipe.time.replace('min', '')) // Converte o tempo para número
            };
        });



    return (
        <>
            <section className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <h4 className={styles.title}>
                            Vapt Vupt - Receitas Rápidas
                        </h4>
                    </div>
                </div>
                <div className={styles.row}>
                    {filteredRecipes.map(recipe => (
                        <div className={styles.column}
                            key={recipe.id}>
                            <div className={styles.vapt_box_row}
                            >
                                <div className={styles.vapt_box_column} >
                                    <img src={`http://localhost:3333/recipe/${recipe.image}`} alt={recipe.recipe_name} />
                                    <h5>{recipe.recipe_name}</h5>
                                    <p>{recipe.preparation}</p>
                                    <div className={styles.line}></div>
                                    <div className={styles.vapt_info}>
                                        <span>
                                            <PiTimerFill />
                                            {recipe.time} Min
                                        </span>
                                        <span>
                                            <PiCookingPotFill />
                                            Fácil
                                        </span>
                                        <span>
                                            <PiStarFill />
                                            4.5
                                        </span>
                                    </div>
                                    <div className={styles.button_container}>
                                        <button
                                            className={styles.button}
                                        >
                                            <a href="/vapt-selected">
                                                Cozinhar
                                                <PiChefHatDuotone />
                                            </a>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            <section className={styles.blog_container}>

            </section>

        </>
    );
}