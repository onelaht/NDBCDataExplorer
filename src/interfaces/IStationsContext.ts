import React from "react";
import type {Station} from "../../types/Station.ts";

export interface IStationsContext {
    stations: Station[];
    setStations: React.Dispatch<React.SetStateAction<Station[]>>;
    uniqueCountries: Array<Station["country_code"]>;
    setUniqueCountries: React.Dispatch<React.SetStateAction<Array<Station["country_code"]>>>;
    uniqueOwners: Array<Pick<Station, "code" | "owner_name">>;
    setUniqueOwners: React.Dispatch<React.SetStateAction<Array<Pick<Station, "code" | "owner_name">>>>;
    selCountries: Map<Station["country_code"], boolean>;
    setSelCountries: React.Dispatch<React.SetStateAction<Map<Station["country_code"], boolean>>>;
    selOwners: Map<Station["owner_name"], boolean>;
    setSelOwners: React.Dispatch<React.SetStateAction<Map<Station["owner_name"], boolean>>>;
    filteredStations: Station[];
    getCount: (checks:Map<string, boolean>)=>number;
}