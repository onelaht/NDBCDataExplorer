// react
import React, {useCallback, useEffect} from "react";
// types and interfaces
import type {IMeteorologicalDriftData} from "../../../types/IMeteorologicalDriftData.ts";
// react router (get router path)
import {useLocation} from "react-router-dom";
// child component
import BaseLoader from "./BaseLoader.tsx";

export default function MeteorologicalDriftChartLoader({setData, setIsFetched}:
    {setData: React.Dispatch<React.SetStateAction<IMeteorologicalDriftData[]>>,
     setIsFetched:React.Dispatch<React.SetStateAction<boolean>>}) {
    // get router path
    const {pathname} = useLocation();

    // retrieve meteor. data via backend
    const fetchData = useCallback(async () => {
        const res = await fetch('/api/getDRIFT/', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stationID: pathname.substring(1),
            })
        });
        if (!res.ok)
            throw new Error(res.statusText);
        else {
            const data: IMeteorologicalDriftData[] = await res.json();
            setData(data);
        }
    }, [pathname, setData])

    useEffect(() => {
        fetchData().then(() => setIsFetched(true));
    }, []);

    return (
        <>
            <BaseLoader label={"Retrieving data..."}/>
        </>
    )
}