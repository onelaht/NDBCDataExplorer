// react
import {useCallback, useEffect, useState} from "react";
// types
import type {StationTableTuple} from "../types/StationTable.ts";
// react leaflet components
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
// leaflet types
import type {LatLngExpression} from "leaflet";
// leaflet styling
import 'leaflet/dist/leaflet.css'

export default function App() {
    // fetching via api
    const BASE = import.meta.env.DEV ? '' : 'https://buoymap.onelaht.workers.dev/'
    // array of station metadata
    const [stations, setStations] = useState<StationTableTuple[]>([]);

    // initialize stations arr by fetching station_table db
    const fetchStations = useCallback(async() => {
        // fetch via endpoint
        const res = await fetch(`${BASE}/api/stations/`)
        if(!res.ok) {
            throw new Error("Failed to fetch stations.");
        }
        const result = await res.json();
        // assign data
        setStations(result);
    }, [BASE])

    // run fetcher at start
    useEffect(() => {
        fetchStations();
    }, [])

    return (
            <MapContainer center={[51, -0]} zoom={13} style={{width: "100vw", height: "100vh"}}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {stations.length >= 1 && stations.map((s) => (
                    <Marker position={s.location as LatLngExpression}>
                        <Popup>Station Name: {s.name}</Popup>
                    </Marker>
                ))}
            </MapContainer>
    )
}