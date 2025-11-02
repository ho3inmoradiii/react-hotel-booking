import useFetch from "../../hooks/useFetch.js";
import LocationItem from "./LocationItem.jsx";

function LocationList() {
    const { data, isLoading, error } = useFetch('http://localhost:5001/hotels');

    if (isLoading) return <div>Data loading...</div>
    if (error) return <div>{error}</div>

    return <>
        <div className="nearbyLocation">
            <h2 className="nearbyLocation">Nearby Locations</h2>
            <div className="locationList">
                {data.map(hotel => {
                    return <LocationItem key={hotel.id} hotel={hotel} />
                })}
            </div>
        </div>
    </>
}

export default LocationList;
