// hooks/useFetchRecipes.js
import { useState, useEffect } from 'react';

interface UrlProps {
    url: string
}

export const useFetchRecipes = (url: UrlProps) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState<string>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
        };

        fetchData();
    }, [url]);

    return { data, error };
};
