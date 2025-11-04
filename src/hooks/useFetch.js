import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useSharedData } from "../components/Hotels/HotelsLayoutWithContext.jsx";

function useFetch(url, query = '') {
    const { setSharedData } = useSharedData();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setError(null);
        setIsLoading(true);

        const fetchData = async () => {
            try {
                const response = await axios.get(`${url}?${query}`);
                setData(response.data);
                setSharedData(response.data);
            } catch (error) {
                setError(error)
                toast(error);
            } finally {
                setIsLoading(false)
            }
        }

        fetchData();
    },[url, query]);

    return { data, isLoading, error };
}

export default useFetch;
