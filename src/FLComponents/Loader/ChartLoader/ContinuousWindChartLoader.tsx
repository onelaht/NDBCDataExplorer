// react
import React, {useCallback, useEffect} from "react";
// types and interfaces
import type {ICWindData} from "../../../../types/ICWindData.ts";
// react router (get router path)
import {useLocation} from "react-router-dom";
// child component
import BaseLoader from "../BaseLoader.tsx";

export default function ContinuousWindChartLoader({setTypeData, setIsFetched}:
    {setTypeData: React.Dispatch<React.SetStateAction<ICWindData[]>>,
     setIsFetched:React.Dispatch<React.SetStateAction<boolean>>}) {
    // get router path
    const {pathname} = useLocation();

    // retrieve meteor. data via backend
    const fetchData = useCallback(async () => {
        const res = await fetch('/api/getCWIND/', {
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
            const data: ICWindData[] = await res.json();
            setTypeData(data);
        }
    }, [pathname, setTypeData])

    useEffect(() => {
        fetchData().then(() => setIsFetched(true));
    }, []);

    return (
        <>
            <BaseLoader label={"Retrieving data..."}/>
        </>
    )
}