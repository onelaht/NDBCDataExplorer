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
// react router
import {useNavigate} from "react-router-dom";
// types and interfaces
import type {Initializer} from "../../types/Initializer.ts";
import type {IStation} from "../../types/IStation.ts";
import type {IStationData} from "../../types/IStationData.ts";
// google svg icon
import SupportIcon from "../SVGIcons/MUI_Support_B89230.svg"

export default function MapLayer() {
    // route to specific station id
    const nav = useNavigate();
    // global vars
    const {setStations, setUniqueOwners, setSelCountries,
        setSelOwners, setUniqueCountries, filteredStations} = useStations();

    // initializes country and owner filter
    // - if at least 1 unique data exists, initializes map for either filter type
    // - if no unique data exists, ignores initialization
    const initSelectedValues = useCallback((c: string[],
                                            o:Pick<IStationData, "code" | "owner_name">[]) => {
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

    // initialize stations arr by fetching station_table db
    const fetchStations = useCallback(async() => {
        // fetch via endpoint
        const res = await fetch(`/api/stations/`)
        // if unsuccessful throw error
        if(!res.ok) {
            throw new Error("Failed to fetch stations.");
        }
        // get data
        const result:Initializer = await res.json();
        // assign data
        if(result?.stations?.length > 0) {
            const tempMap = new Map<string, IStationData>();
            result.stations.forEach((i:IStation) => {
                tempMap.set(i.station_id, i.data);
            })
            setStations(tempMap);
        }
        setUniqueCountries(result?.uCountries ?? []);
        setUniqueOwners(result?.uOwners ?? []);
        // initialize selected values
        initSelectedValues(result?.uCountries ?? [], result?.uOwners ?? []);
    }, [initSelectedValues, setStations, setUniqueCountries, setUniqueOwners])

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
            {filteredStations.size > 0 && [...filteredStations].map(([k,v]) => (
                <Marker
                    icon={muiMarkerIcon}
                    position={v.location as LatLngExpression}
                    eventHandlers={{
                        click: () => {
                            nav(`/${k}`)
                        }
                    }}
                >
                    <Popup>Station Name: {k}</Popup>
                </Marker>
            ))}
        </MapContainer>
    )
}