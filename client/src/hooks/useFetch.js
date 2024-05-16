import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const res = await axios.get(url);

                setData(res.data);
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        };
        fetchData();
    }, [url]);

    const reFetch = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get(url);

            setData(res.data);
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };
    
    return { data, isLoading, error, reFetch };
};

export default useFetch;
