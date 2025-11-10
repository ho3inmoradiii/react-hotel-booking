import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { useNavigate } from "react-router-dom";


function AddBookmark() {
    const [ searchParams ] = useSearchParams();
    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');
    const [city, setCity] = useState('');
    const [country, setCountry] = useState('');
    const navigate = useNavigate();

    const { data, isLoading, error } = useFetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`)

    useEffect(() => {
        if (data && data.address) {
            const cityValue =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                data.address.hamlet ||
                "";
            setCity(cityValue);
            setCountry(data.address.country);
        }
    }, [data]);

    if (isLoading) return <div>Data loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleFormChange = (event, typeChange) => {
        switch (typeChange) {
            case "cityChange":
                setCity(event.target.value)
                break;
            case "countryChange":
                setCountry(event.target.value)
                break;
            default:
                console.log("Invalid day");
        }
    }

    return <>
        <div>
            <h2>Bookmark New Location</h2>
            <form className="form">
                <div className="formControl">
                    <label htmlFor="cityName">City</label>
                    <input type="text" id="cityName" name="cityName" value={city} onChange={(event) => handleFormChange(event, 'cityChange')} />
                </div>
                <div className="formControl">
                    <label htmlFor="countryName">Country</label>
                    <input type="text" id="countryName" name="countryName" value={country} onChange={(event) => handleFormChange(event, 'countryChange')} />
                </div>
                <div className="buttons">
                    <button type="button" className="btn btn--back" onClick={() => navigate(-1)}>← Back</button>
                    <button className="btn btn--primary">Add</button>
                </div>
            </form>
        </div>
    </>
}

export default AddBookmark;
