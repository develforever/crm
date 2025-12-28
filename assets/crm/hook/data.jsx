

import { useState, useEffect } from 'react';

export const useApiService = (url, options) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = async (url, options) => {
        setLoading(true);

        if(!options){
            options = {};
        }

        options.headers = {
            ...(options.headers??{}), ...{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        try {
            const response = await fetch(`/crm/api${url}`, options);
            if (!response.ok) throw new Error('Błąd pobierania danych');
            const result = await response.json();
            setData(result.data);
            setError(result.error);

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (url) fetchData(url, options);
    }, [url]);

    return { data, loading, error, refetch: fetchData };
};