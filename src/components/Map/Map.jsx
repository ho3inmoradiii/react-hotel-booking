import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import {createSearchParams, useSearchParams} from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


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
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            <MapRecenterHandler mapCenter={mapCenter} />

            <LocateMarker />

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
    const [lat, lng] = mapCenter;
    const map = useMap();

    useEffect(() => {
        if (!isNaN(lat) && !isNaN(lng)) {
            map.setView([lat, lng], map.getZoom());
        }
    }, [lat, lng, map]);

    return null;
}

function LocateMarker() {
    const navigate = useNavigate();

    const map = useMapEvents({
        async click(e) {
            map.setView(e.latlng, map.getZoom());
            const { lat, lng } = e.latlng;

            const params = {
                lat,
                lng,
            }
            navigate({
                pathname: '/bookmark/add',
                search: `?${createSearchParams(params)}`
            });
        },
    });
    return null;
}
