import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function useFetch(url, query = '', setSharedDataFn = null) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setError(null);
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const response = await axios.get(query ? `${url}?${query}` : url);
                setData(response.data);
                if (setSharedDataFn) setSharedDataFn(response.data);
            } catch (error) {
                setError(error)
                toast(error);
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    },[url, query, setSharedDataFn]);

    return { data, isLoading, error };
}

export default useFetch;
