import {useEffect, useState} from "react";
import {tr} from "date-fns/locale";
import axios from "axios";

function useFetch(url) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setError(null);
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const response = await axios.get(url);
                setData(response.data);
            } catch (error) {
                setError(error)
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    },[url]);

    return { data, isLoading, error };
}

export default useFetch;
