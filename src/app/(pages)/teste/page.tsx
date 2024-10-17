"use client"

import { ChangeEvent, useState } from 'react';
import styles from './teste.module.css';
import axios from 'axios';

export default function ReceitaForms() {

    const [data, setData] = useState({
        recipeName: "",
        ingredients: "",
        preparation: "",
    });
    const [file, setFile] = useState<File | null>(null);

    function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        // Criação do FormData para enviar o arquivo junto com os dados
        const formData = new FormData();
        formData.append('file', file as Blob); // Certifique-se de que `file` não seja null
        formData.append('recipe_name', data.recipeName);
        formData.append('ingredients', data.ingredients);
        formData.append('preparation', data.preparation);

        axios.post('http://localhost:3333/recipe/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(res => {
                console.log(res.data);
                alert('Receita cadastrada com sucesso!');
            })
            .catch(err => {
                console.error(err);
                alert('Erro ao cadastrar a receita.');
            });
    }

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = e.target;
        setData({
            ...data,
            [id]: value, // Usa a chave corretamente
        });
        console.log(data)
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Cadastro de Receita</h1>
            <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.field}>
                    <label htmlFor="recipeName" className={styles.label}>Nome da Receita</label>
                    <input
                        type="text"
                        id="recipeName"
                        className={styles.input}
                        placeholder="Digite o nome da receita"
                        onChange={handleChange}
                        value={data.recipeName}
                    />
                </div>
                <div className={styles.field}>
                    <label htmlFor="ingredients" className={styles.label}>Ingredientes</label>
                    <textarea
                        id="ingredients"
                        className={styles.textarea}
                        placeholder="Digite os ingredientes"
                        onChange={handleChange}
                        value={data.ingredients}
                    ></textarea>
                </div>
                <div className={styles.field}>
                    <label htmlFor="preparation" className={styles.label}>Modo de Preparo</label>
                    <textarea
                        id="preparation"
                        className={styles.textarea}
                        placeholder="Descreva o modo de preparo"
                        onChange={handleChange}
                        value={data.preparation}
                    ></textarea>
                </div>
                <div className={styles.field}>
                    <label htmlFor="file" className={styles.label}>Imagem da Receita</label>
                    <input
                        type="file"
                        id="file"
                        className={styles.input}
                        onChange={handleFileChange}
                    />
                </div>
                <button type="submit" className={styles.button}>Cadastrar Receita</button>
            </form>
        </div>
    );
}
