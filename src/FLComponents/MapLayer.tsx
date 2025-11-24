// react
import {useCallback, useEffect} from "react";
// react leaflet components
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
// leaflet types
import type {LatLngExpression} from "leaflet";
import L from "leaflet";
// leaflet styling
import 'leaflet/dist/leaflet.css'
import {useStations} from "../Providers/ProviderStations.tsx";
// type
import type {StationData} from "../../types/StationData.ts";
// google svg icon
import SupportIcon from "../SVGIcons/MUI_Support_B89230.svg"
import type {StationTable} from "../../types/StationTable.ts";
export default function MapLayer() {
    // global vars
    const {setStations, setUniqueOwners, setSelCountries,
        setSelOwners, setUniqueCountries, filteredStations} = useStations();
    // initialize stations arr by fetching station_table db
    const fetchStations = async() => {
        // fetch via endpoint
        const res = await fetch(`/api/stations/`)
        // if unsuccessful throw error
        if(!res.ok) {
            throw new Error("Failed to fetch stations.");
        }
        // get data
        const result:StationData = await res.json();
        // assign data
        setStations(result?.stations ?? []);
        setUniqueCountries(result?.uCountries ?? []);
        setUniqueOwners(result?.uOwners ?? []);
        // initialize selected values
        initSelectedValues(result?.uCountries ?? [], result?.uOwners ?? []);
    }

    // initializes country and owner filter
    // - if at least 1 unique data exists, initializes map for either filter type
    // - if no unique data exists, ignores initialization
    const initSelectedValues = useCallback((c: string[],
                                            o:Pick<StationTable, "code" | "owner_name">[]) => {
        // if unique country data exists
        if(c.length > 0) {
            // assign as map
            setSelCountries(prev => {
                const temp = new Map<string, boolean>(prev);
                c.forEach(i => {
                    if(Object.values(i)[0] === "US") temp.set(Object.values(i)[0], true);
                    else temp.set(Object.values(i)[0], false);
                })
                return temp;
            })
        }
        // if unique owners data exists
        if(o.length > 0) {
            // assign as map
            setSelOwners(prev => {
                const temp = new Map<string, boolean>(prev);
                o.forEach(i => {
                    temp.set(Object.values(i)[0], false);
                })
                return temp;
            })
        }
    }, [setSelCountries, setSelOwners])

    // mui icon for leaflet markers
    const muiMarkerIcon = L.icon({
        iconUrl:SupportIcon,
        iconSize:[32, 32],
    })

    // run fetcher at start
    useEffect(() => {
        fetchStations();
    }, [])

    return (
        <MapContainer worldCopyJump={true} center={[51, -0]} zoom={13} style={{width: "100vw", height: "100vh"}}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredStations.length >= 1 && filteredStations?.map((s) => (
                <Marker icon={muiMarkerIcon} position={s.location as LatLngExpression}>
                    <Popup>Station Name: {s.station_name}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}