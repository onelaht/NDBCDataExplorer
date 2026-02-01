// react
import React, {createContext, useContext, useMemo, useState} from "react";
// types and interfaces
import type {IMapMarkers} from "../../types/IMapMarkers.ts";

interface IInitializerContext {
    mapMarkers : IMapMarkers[];
    setMapMarkers: React.Dispatch<React.SetStateAction<IMapMarkers[]>>
    filteredMarkers: IMapMarkers[];
    distinctOwners : Set<string>;
    distinctCountries: Set<string>;
    selCountries: Set<string>;
    setSelCountries: React.Dispatch<React.SetStateAction<Set<string>>>
    selOwners: Set<string>;
    setSelOwners: React.Dispatch<React.SetStateAction<Set<string>>>
}

const InitializerContext = createContext<IInitializerContext | null>(null);

export default function ProviderInitializer({children}:{children: React.ReactNode}) {
    // holds all existing station from db
    const [mapMarkers, setMapMarkers] = useState<IMapMarkers[]>([]);
    // holds all selected/filtered countries and owners
    const [selCountries, setSelCountries] = useState<Set<string>>(new Set<string>(["US"]));
    const [selOwners, setSelOwners] = useState<Set<string>>(new Set<string>());
    // holds all unique (non-dup) owners
    const distinctOwners = useMemo(() => {
        const temp = new Set<string>();
        if(mapMarkers.length < 0) return temp;
        mapMarkers.forEach(marker => {
            if(!temp.has(marker.owner_name))
                temp.add(marker.owner_name);
        })
        return temp;
    }, [mapMarkers]);
    // holds all unique (non-dup) countries
    const distinctCountries = useMemo(() => {
        const temp = new Set<string>();
        if(mapMarkers.length < 0) return temp;
        mapMarkers.forEach(marker => {
            if(!temp.has(marker.country_code))
                temp.add(marker.country_code);
        })
        return temp;
    }, [mapMarkers]);
    // returns the subset of mapMarkers
    // - returns an empty array if no filters are set
    const filteredMarkers = useMemo(() => {
        // get all stations
        let temp = [...mapMarkers];
        // if no filters are set, return all map markers
        if(selCountries.size === 0 && selOwners.size === 0)
            return [];
        // filter stations based on selected countries
        if(selCountries.size > 0)
            temp = temp.filter(i => selCountries.has(i.country_code))
        // filter stations based on selected owners
        if(selOwners.size > 0)
            temp = temp.filter(i => selOwners.has(i.owner_name))
        return temp;
    }, [selCountries, selOwners, mapMarkers]);

    return (
        <InitializerContext value={{mapMarkers, setMapMarkers, filteredMarkers, distinctCountries, distinctOwners, selCountries,
            setSelCountries, selOwners, setSelOwners}}>
            {children}
        </InitializerContext>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useInitializer = () => {
    const ctx = useContext(InitializerContext);
    if(!ctx) throw new Error("InitializerContext must be used within fetch");
    return ctx;
}

