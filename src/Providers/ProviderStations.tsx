import React, {createContext, useContext, useMemo, useState} from "react";
// types and interfaces
import type {StationTable} from "../../types/StationTable.ts";
import type {IStationsContext} from "../interfaces/IStationsContext.ts";

const StationsContext = createContext<IStationsContext | null>(null);

export default function ProviderStations({children}:{children: React.ReactNode}){
    // store all station data (tuples)
    const [stations, setStations] = useState<StationTable[]>([]);
    // unique (non dup) data for country and owner type
    const [uniqueCountries, setUniqueCountries] = useState<Array<StationTable["country_code"]>>([]);
    const [uniqueOwners, setUniqueOwners] = useState<Array<Pick<StationTable, "code" | "owner_name">>>([]);
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
    const filteredStations:StationTable[] = useMemo(() => {
        // if no values are checked, return an empty array
        if(getCount(selCountries) < 1 && getCount(selOwners) < 1) return []
        // retrieve all stations
        let temp = [...stations];
        // filter based on countries selected
        if(getCount(selCountries) >= 1)
            temp = temp.filter((i) => selCountries.get(i.country_code));
        // filter based on owners selected
        if(getCount(selOwners) >= 1)
            temp = temp.filter((i) => selOwners.get(i.code));
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
