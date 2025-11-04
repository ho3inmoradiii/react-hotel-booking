import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useSearchParams } from "react-router-dom";
import {useEffect, useState} from "react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function Map({ hotels }) {
    const initialZoom = 13;
    const [searchParams] = useSearchParams();
    const [mapCenter, setMapCenter] = useState([50, 3]);

    const lat = searchParams.get('lat');
    const lng = searchParams.get('lng');

    useEffect(() => {
        if (lat && lng) setMapCenter([lat, lng]);
    }, [lat, lng])



    return (
        <MapContainer center={mapCenter} zoom={initialZoom} style={{ height: '100%', width: '100%' }}>
            <button className="getLocation">Use your location</button>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapRecenterHandler mapCenter={mapCenter} />

            {/* Loop through the hotels array and create markers */}
            {hotels.map(hotel => (
                <Marker
                    key={hotel.id}
                    position={[hotel.latitude, hotel.longitude]}
                >
                    <Popup>
                        <strong>{hotel.name}</strong>
                        <br />
                        Lat: {hotel.latitude}, Lng: {hotel.longitude}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

export default Map;

function MapRecenterHandler({mapCenter}) {
    const map = useMap();


    useEffect(() => {
        if (!isNaN(mapCenter[0]) && !isNaN(mapCenter[1])) {
            map.setView([mapCenter[0], mapCenter[1]], map.getZoom());
        }
    }, [mapCenter[0], mapCenter[1], map]);

    return null;
}
