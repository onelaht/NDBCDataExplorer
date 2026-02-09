// react
import React, {useCallback, useEffect} from "react";
// types and interfaces
import type {IMapMarkers} from "../../../types/IMapMarkers.ts";
// global vars
import {useInitializer} from "../../Providers/ProviderInitializer.tsx";
// child components
import BaseLoader from "./BaseLoader.tsx";

export default function MapLayerLoader({setIsFetched}:{setIsFetched:React.Dispatch<React.SetStateAction<boolean>>}) {
    // globar var
    const {setMapMarkers} = useInitializer();
    // get data from backend
    const fetchData = useCallback(async () => {
        const res = await fetch("/api/getMapMarkers/");
        if(!res.ok)  {
            console.error("Could not fetch map markers.", res.status);
            return;
        }
        const data:IMapMarkers[] = await res.json();
        // update map marker global var
        setMapMarkers(data);
    }, [setMapMarkers]);
    // execute fetchData
    useEffect(() => {
        fetchData().then(() => setIsFetched(true));
    }, [])

    return (
        <BaseLoader label={"Retrieving Marker Data..."}/>
    )
}