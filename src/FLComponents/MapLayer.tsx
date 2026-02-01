// react
import {useState} from "react";
// react leaflet components
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
// leaflet types
import type {LatLngExpression} from "leaflet";
import L from "leaflet";
// leaflet styling
import 'leaflet/dist/leaflet.css'
// react router
import {useNavigate} from "react-router-dom";
// google svg icon
import SupportIcon from "../SVGIcons/MUI_Support_B89230.svg"
// global vars
import {useInitializer} from "../Providers/ProviderInitializer.tsx";
// loader component
import MapLayerLoader from "./Loader/MapLayerLoader.tsx";

export default function MapLayer() {
    // route to specific station id
    const nav = useNavigate();
    // global vars
    const {filteredMarkers} = useInitializer();
    // fetcher
    const [isFetched, setIsFetched] = useState<boolean>(false);

    // mui icon for leaflet markers
    const muiMarkerIcon = L.icon({
        iconUrl:SupportIcon,
        iconSize:[32, 32],
    })

    return (
        <>
            { !isFetched ?
                <MapLayerLoader setIsFetched={val => setIsFetched(val)}/>
                :
                <MapContainer worldCopyJump={true} center={[51, -0]} zoom={13} style={{width: "100%", height: "100%"}}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {filteredMarkers.map((i) => (
                        <Marker
                            icon={muiMarkerIcon}
                            position={i.location as LatLngExpression}
                            eventHandlers={{
                                click: () => {
                                    nav(`/${i.station_id}`)
                                }
                            }}
                        >
                            <Popup>Station ID: {i.station_id}</Popup>
                        </Marker>
                    ))}
                </MapContainer>

            }
        </>
    )
}