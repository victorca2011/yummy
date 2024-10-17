"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
interface RecipesProps {
    id: string; // ou number, dependendo do seu modelo
    recipe_name: string;
    ingredients: string;
    preparation: string;
    time: string;
    image: string;
}

const RecipePage = ({ params }: { params: { id: string } }) => {
    const [data, setData] = useState<RecipesProps>([])
    const { id } = params;

    function getRecipes() {
        axios.get<RecipesProps>(`http://localhost:3333/recipe/`)
            .then(res => setData(res.data))
            .catch(error => console.log(error))
    }
    useEffect(() => {
        getRecipes();

    }, [id])
    console.log(data)

    return (
        <>

            <div key={id}> {/* Usando recipe.id como chave */}
                <h1>{data.recipe_name}</h1>
                <img src={`http://localhost:3333/recipe/${data.image}`} alt={data.recipe_name} />
                <p>{data.preparation}</p>
                <p>Tempo de preparo: {data.time} Minutos</p>
                <p>Dificuldade: Fácil</p>
            </div>

        </>
    );

};

export default RecipePage;
