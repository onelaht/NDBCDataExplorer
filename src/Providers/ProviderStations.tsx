import React, {createContext, useContext, useMemo, useState} from "react";
// types and interfaces
import type {IStationsContext} from "../interfaces/IStationsContext.ts";
import type {IStationData} from "../../types/IStationData.ts";

const StationsContext = createContext<IStationsContext | null>(null);

export default function ProviderStations({children}:{children: React.ReactNode}){
    // store all station data (tuples)
    const [stations, setStations] = useState<Map<string, IStationData>>(new Map<string, IStationData> ());
    // unique (non dup) data for country and owner type
    const [uniqueCountries, setUniqueCountries] = useState<Array<IStationData["country_code"]>>([]);
    const [uniqueOwners, setUniqueOwners] = useState<Array<Pick<IStationData, "code" | "owner_name">>>([]);
    // maps for selected countries and map (used for filters)
    const [selCountries, setSelCountries] = useState<Map<string, boolean>>(new Map<string, boolean>());
    const [selOwners, setSelOwners] = useState<Map<string, boolean>>(new Map<string, boolean>());

    // returns amount of elements are checked, based on specified filter type
    const getCount = (checks:Map<string, boolean>) => {
        let counter = 0;
        checks.forEach((i) => {if(i) counter++;});
        return counter;
    }

    // returns an array of filtered stations
    // - returns an empty array if no country or owner is selected
    const filteredStations:Map<string, IStationData> = useMemo(() => {
        // if no values are checked, return an empty array
        if(getCount(selCountries) < 1 && getCount(selOwners) < 1) return new Map<string, IStationData>();
        // retrieve all stations
        let temp = new Map<string, IStationData>(stations);
        console.log(temp);
        // filter based on countries selected
        if(getCount(selCountries) > 0)
            temp = new Map([...temp].filter(([,v]) => {
                return selCountries.get(v.country_code) ?? false;
            }))
        console.log(temp);
        // filter based on owners selected
        if(getCount(selOwners) > 0)
            temp = new Map([...temp].filter(([,v]) => {
                return selOwners.get(v.owner_name) ?? false;
            }))
        return temp
    }, [selCountries, selOwners, stations]);

    return (
        <StationsContext value={{stations, setStations, uniqueCountries, setUniqueCountries, uniqueOwners,
            setUniqueOwners, selCountries, setSelCountries, selOwners, setSelOwners, filteredStations, getCount}}>
            {children}
        </StationsContext>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useStations = () => {
    const ctx = useContext(StationsContext);
    if(!ctx) throw new Error("StationsContext must be used within a provider");
    return ctx;
}
