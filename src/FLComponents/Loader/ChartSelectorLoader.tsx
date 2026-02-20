import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import BaseLoader from "./BaseLoader.tsx";

export default function ChartSelectorLoader({setDatatype, setIsFetched}:
    {setDatatype:React.Dispatch<React.SetStateAction<string[]>>,
     setIsFetched:React.Dispatch<React.SetStateAction<boolean>>}) {
    const {pathname} = useLocation();
    const fetchData = async () => {
        const res = await fetch("/api/getDatatype/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                stationID: pathname.substring(1),
            })
        });
        if(!res.ok)
            throw new Error(res.statusText);
        else {
            const data:string[] = await res.json();
            setDatatype(data);
        }
    }

    useEffect(() => {
        fetchData().then(() => setIsFetched(true));
    }, [])

    return (
        <>
            <BaseLoader label={"Retrieving datatypes..."}/>
        </>
    )
}