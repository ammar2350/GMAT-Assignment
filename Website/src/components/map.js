import React, { useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

function Map(props) {
    const mapOptions = {
        lat: props.latitude,
        long: props.longitude,
        zoom: 17,
    };

    const position = [mapOptions.lat, mapOptions.long];
    const mapRef = useRef();

    const setMapView = () => {
        if (mapRef.current) {
        mapRef.current.setView(position, mapOptions.zoom);
        }
    };

    useEffect(() => {
        setMapView();
    }, [mapOptions.lat, mapOptions.long, mapOptions.zoom]);

    return (
        <MapContainer
        ref={mapRef}
        center={position}
        zoom={mapOptions.zoom}
        scrollWheelZoom={true}
        style={{ width: '100%', height: '100%' }}
        >
        <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
            <Popup>
            Titik <br /> Lokasi
            </Popup>
        </Marker>
        </MapContainer>
    );
}

export default Map;
