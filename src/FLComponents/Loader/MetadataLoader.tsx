import React, {useCallback, useEffect} from "react";
import BaseLoader from "./BaseLoader.tsx";
import {useLocation} from "react-router-dom";
import type {IMetadata} from "../../../types/IMetadata.ts";

export default function MetadataLoader({setMetadata, setIsFetched}:
    {setMetadata: React.Dispatch<React.SetStateAction<IMetadata | null>>,
     setIsFetched: React.Dispatch<React.SetStateAction<boolean>>})
{
    // routed station id
    const {pathname} = useLocation();
    // retrieve metadata from db
    const fetchData = useCallback(async (path:string) => {
        const res = await fetch("/api/getMetadata/",
            {
                method: "POST",
                headers: {"content-type": "application/json"},
                body: JSON.stringify({data: path})
            });
        if(!res.ok)  {
            console.error("Could not fetch metadata.", res.status);
            return;
        }
        const data:IMetadata = await res.json();
        setMetadata(data);
    }, [setMetadata]);

    useEffect(() => {
        fetchData(pathname.substring(1)).then(() => setIsFetched(true))
    }, [pathname])

    return (
        <>
            <BaseLoader label={"Retrieving Metadata..."}></BaseLoader>
        </>
    )
}