// react
import React, {createContext, useContext, useMemo, useState} from "react";
// types and interfaces
import type {IMapMarkers} from "../../types/IMapMarkers.ts";

interface IInitializerContext {
    mapMarkers : IMapMarkers[];
    setMapMarkers: React.Dispatch<React.SetStateAction<IMapMarkers[]>>
    filteredMarkers: IMapMarkers[];
    distinctDatatypes: Set<string>;
    distinctOwners : Set<string>;
    setDistinctOwners: React.Dispatch<React.SetStateAction<Set<string>>>
    distinctCountries: Set<string>;
    setDistinctCountries: React.Dispatch<React.SetStateAction<Set<string>>>;
    selCountries: Set<string>;
    setSelCountries: React.Dispatch<React.SetStateAction<Set<string>>>
    selDatatypes: Set<string>;
    setSelDatatypes: React.Dispatch<React.SetStateAction<Set<string>>>
    selOwners: Set<string>;
    setSelOwners: React.Dispatch<React.SetStateAction<Set<string>>>
}

const InitializerContext = createContext<IInitializerContext | null>(null);

export default function ProviderInitializer({children}:{children: React.ReactNode}) {
    // holds all existing station from db
    const [mapMarkers, setMapMarkers] = useState<IMapMarkers[]>([]);
    // holds all selected/filtered countries, owners, and datatypes
    const [selCountries, setSelCountries] = useState<Set<string>>(new Set<string>(["US"]));
    const [selOwners, setSelOwners] = useState<Set<string>>(new Set<string>());
    const [selDatatypes, setSelDatatypes] = useState<Set<string>>(new Set<string>());
    // holds all unique datatypes
    const distinctDatatypes = new Set(["adcp", "cwind", "dart", "drift", "drift", "ocean", "rain", "spec",
        "spectral", "srad", "supl", "txt"]);
    // holds all unique (non-dup) owners
    const [distinctOwners, setDistinctOwners] = useState<Set<string>>(new Set<string>());
    // holds all unique (non-dup) countries
    const [distinctCountries, setDistinctCountries] = useState<Set<string>>(new Set<string>());
    // returns the subset of mapMarkers
    // - returns an empty array if no filters are set
    const filteredMarkers = useMemo(() => {
        // get all stations
        let temp = [...mapMarkers];
        // if no filters are set, return all map markers
        if(selCountries.size === 0 && selOwners.size === 0 && selDatatypes.size == 0)
            return [];
        // filter stations based on selected countries
        if(selCountries.size > 0)
            temp = temp.filter(i => selCountries.has(i.country_code))
        // filter stations based on selected owners
        if(selOwners.size > 0)
            temp = temp.filter(i => selOwners.has(i.owner_name))
        // filter stations based on selected datatypes
        if(selDatatypes.size > 0)
            temp = temp.filter(i => {
                // convert str arr to set
                const s = new Set<string>(i.datatypes);
                // determine if selDatatypes is subset of station's datatype
                for(const i of selDatatypes) {
                    console.log(s);
                    if(!s.has(i)) return false;
                }
                return true;
            })
        return temp;
    }, [mapMarkers, selCountries, selOwners, selDatatypes]);

    return (
        <InitializerContext value={{mapMarkers, setMapMarkers, filteredMarkers, distinctDatatypes, distinctCountries,
            setDistinctCountries, distinctOwners, setDistinctOwners, selCountries, setSelCountries, selOwners,
            setSelOwners, selDatatypes, setSelDatatypes}}>
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

