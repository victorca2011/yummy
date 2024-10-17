"use client"

import styles from './recipes.module.css';

import axios from 'axios';
import { useEffect, useState } from 'react';
import Home from '@/app/page';
import Image from 'next/image';
import { Banner } from '@/app/components/banner/page';

export default function Recipes() {
    const [clickedRecipe, setClickedRecipe] = useState<clickedRecipe>(null);
    const [recipes, setRecipes] = useState<clickedRecipe>([]);
    const [error, setError] = useState<string | null>(null); // Tipar corretamente o erro como string ou null

    interface clickedRecipe {
        id: string; // ou number, dependendo do seu modelo
        recipe_name: string;
        ingredients: string;
        preparation: string;
        image: string;
    }


    useEffect(() => {
        const RecipesApi = async () => {
            try {
                const response = await axios.get<clickedRecipe>('http://localhost:3333/recipe/');
                setRecipes(response.data)

            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message); // Erro do tipo Error
                }
            }
        };
        RecipesApi();
    }, []);


    console.log("Receitas", recipes)
    const handleRecipe = (id: string) => {
        const recipe = recipes.find(recipe => recipe.id === id);
        if (recipe) {
            setClickedRecipe(recipe);
            console.log("Receita selecionada:", recipe.recipe_name);
        }
    };
    useEffect(() => {
        // Se houver receitas, inicializa com a primeira
        if (recipes.length > 0) {
            setClickedRecipe(recipes[0]);
        }
    }, [recipes]);
    return (
        <>
            <Banner />
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.column}>
                        <div className={styles.recipe_title}>
                            <h1>Receitas Populares Para Você Conhecer</h1>
                            <span>Escolha uma receita abaixo:</span>
                        </div>
                        <div className={styles.recipeList}>
                            {recipes.slice(0, 4).map(recipe => (
                                <a
                                    key={recipe.id}
                                    className={styles.recipeItem}
                                    onClick={() => handleRecipe(recipe.id)}
                                >
                                    {`Receita de ${recipe.recipe_name}`}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.reciperow}>
                    {/* Exibe a receita clicada */}
                    {clickedRecipe && (
                        <div id={`recipe${clickedRecipe.id}`} className={styles.recipeCard}>
                            <div className={styles.recipeContent}>
                                <div className={styles.recipeImageWrapper}>
                                    <Image
                                        src={`http://localhost:3333/recipe/${clickedRecipe.image}`}
                                        width={400}
                                        height={400}
                                        alt="Receita"
                                        className={styles.recipeImage}
                                    />
                                </div>
                                <div className={styles.recipeDetails}>
                                    <h5 className={styles.recipeTitle}>{clickedRecipe.recipe_name}</h5>
                                    <div className={styles.ingredients}>
                                        <span className={styles.sectionTitle}>Ingredientes</span>
                                        <p>{clickedRecipe.ingredients}</p>
                                    </div>
                                    <div className={styles.preparation}>
                                        <span className={styles.sectionTitle}>Modo de Preparo</span>
                                        <p>{clickedRecipe.preparation}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div>
        </>
    )
}