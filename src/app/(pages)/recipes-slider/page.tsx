"use client";

import axios from 'axios';
import styles from './recipes-slider.module.css';
import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import '@splidejs/react-splide/css/skyblue';
import { Banner } from '@/app/components/banner/page';

// Define a interface para a receita
interface ClickedRecipe {
    id: string; // ou number, dependendo do seu modelo
    recipe_name: string;
    ingredients: string;
    preparation: string;
    image: string;
}

export default function RecipesSwipper() {
    // Define o estado para as receitas e para o erro
    const [recipes, setRecipes] = useState<ClickedRecipe[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [clickedRecipe, setClickedRecipe] = useState()

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await axios.get<ClickedRecipe[]>('http://localhost:3333/recipe/');
                setRecipes(response.data); // Define as receitas recebidas
                console.log("Response data", response.data);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setError(error.message); // Erro do tipo Axios
                } else {
                    setError("Ocorreu um erro ao buscar as receitas.");
                }
            }
        };
        fetchRecipes();
    }, []);

    // Exibe uma mensagem de erro, se houver
    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    const handleRecipe = (id: string) => {
        const recipe = recipes.find(recipe => recipe.id === id);
        if (recipe) {
            setClickedRecipe(recipe)
        }
    }

    useEffect(() => {
        if (recipes.length > 0) {
            setClickedRecipe(recipes[0]);
        }
    }, [recipes])

    return (
        <>
            <Banner />
            <section className={styles.container}>

                <Splide
                    options={{
                        type: 'loop',
                        perPage: 1,
                        drag: 'free',
                        arrows: false,
                        pagination: false,
                        interval: 10000,
                        gap: '2.5rem',
                        width: '100%',
                        autoScroll: {
                            pauseOnHover: true,
                            pauseOnFocus: false,
                            rewind: false,
                            speed: 1,
                        }
                    }}
                    extensions={{ AutoScroll }}
                >
                    {recipes.map((recipe) => (
                        <SplideSlide key={recipe.id} className={styles.splideslide}
                        >
                            <div className={styles.recipe_box}>
                                <img
                                    src={`http://localhost:3333/recipe/${recipe.image}`}
                                    alt="Receita"
                                    className={styles.recipeImage}
                                />
                                <h5 className={styles.recipeTitle}>{recipe.recipe_name}</h5>

                                <a
                                    key={recipe.id}
                                    onClick={() => handleRecipe(recipe.id)}
                                    className={styles.btn}>
                                    Quero Cozinhar
                                </a>
                            </div>
                        </SplideSlide>
                    ))}
                </Splide>
            </section>
            <section>
    <div className={styles.recipe_box}>
        {clickedRecipe && (
            <div id={`recipe${clickedRecipe.id}`} className={styles.recipeCard}>
                <div className={styles.recipeContent}>
                    <div className={styles.recipeImageWrapper}>
                        <img src={`http://localhost:3333/recipe/${clickedRecipe.image}`}
                            width={400}
                            height={400}
                            alt="Receita" className={styles.recipeImage} />
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
</section>

        </>
    );
}
