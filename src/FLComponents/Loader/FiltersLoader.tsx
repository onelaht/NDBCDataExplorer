// react
import React, {useCallback, useEffect} from "react";
// global vars
import {useInitializer} from "../../Providers/ProviderInitializer.tsx";
// types and interfaces
import type {IFilterSet} from "../../../types/IFilterSet.ts";
// child component
import BaseLoader from "./BaseLoader.tsx";

export default function FiltersLoader({setIsFetched}:
    {setIsFetched: React.Dispatch<React.SetStateAction<boolean>>}) {
    // global vars
    const {setDistinctOwners, setDistinctCountries} = useInitializer();
    // retrieve metadata from db
    const fetchData = useCallback(async () => {
        const res = await fetch("/api/getFilterSet/")
        if(!res.ok)  {
            console.error("Could not fetch filter sets.", res.status);
            return;
        }
        const data:IFilterSet = await res.json();
        // assign data if exists
        if(data?.distinctOwners?.length > 0)
            setDistinctOwners(new Set<string>(data.distinctOwners));
        if(data?.distinctCountries?.length > 0)
            setDistinctCountries(new Set<string>(data.distinctCountries));
    }, [setDistinctOwners, setDistinctCountries]);

    useEffect(() => {
        fetchData().then(() => setIsFetched(true));
    }, [])

    return (
        <>
            <BaseLoader label={"Retrieving Filter Sets..."}/>
        </>
    )
}