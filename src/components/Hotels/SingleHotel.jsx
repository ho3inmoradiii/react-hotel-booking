import useFetch from "../../hooks/useFetch.js";
import { useParams } from "react-router-dom";
import { useSharedData } from "./HotelsLayoutWithContext.jsx";
import { useEffect } from "react";

function SingleHotel() {
    const { hotelId } = useParams();
    const { data, isLoading, error } = useFetch(`http://localhost:5000/hotels/${hotelId}`)

    const { setCurrentHotel } = useSharedData();

    useEffect(() => {
        setCurrentHotel(hotelId);
    }, [hotelId, setCurrentHotel])

    if (isLoading) return <div>Data loading...</div>
    if (error) return <div>{error}</div>
    return <>
        <div className="room">
            <div className="roomDetail">
                <h2>{data.name}</h2>
                <div>{data.number_of_reviews} &bull; {data.host_location}</div>
                <img
                    src={data?.picture_url?.url || ""}
                    alt={data?.name || "Hotel image"}
                />

            </div>
        </div>
    </>
}

export default SingleHotel;
