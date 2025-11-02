function LocationItem({ hotel }) {
    return <>
        <div className="locationItem">
            <img src={hotel.picture_url.url} alt={hotel.name}/>
            <div className="locationItemDesc">
                <span className="location">{hotel.host_location}</span>
                <span className="name">{hotel.name}</span>
                <div className="price">
                    <div>${hotel.price}</div>
                    <span>night</span>
                </div>
            </div>
        </div>
    </>
}

export default LocationItem;
