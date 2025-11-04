import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { Link } from 'react-router-dom';


function HotelsPage() {
    const [searchParams] = useSearchParams();
    const destination = searchParams.get('destination');
    const room = searchParams.get('Room');

    const {data, isLoading, error} = useFetch('http://localhost:5000/hotels', `q=${destination || ''}&accommodates_gte=${room || 1}`)

    if (isLoading) return <div>Data loading...</div>
    if (error) return <div>{error}</div>

    return <>
        <div className="searchList">
            <h2>Search results: {data.length}</h2>
            {data.map(hotel => {
                return <Link to={`/hotels/${hotel.id}?lat=${hotel.latitude}&lng=${hotel.longitude}`} className="searchItem" key={hotel.id}>
                    <img src={hotel.picture_url.url} alt={hotel.name}/>
                    <div className="searchItemDesc">
                        <p className="location">{hotel.smart_location}</p>
                        <p className="name">{hotel.name}</p>
                        <p className="price">${hotel.price}</p>
                        <span>night</span>
                    </div>
                </Link>
            })}
            <div className="searchItem"></div>
        </div>
    </>
}

export default HotelsPage;
