import React from "react";
import type {StationTable} from "../../types/StationTable.ts";

export interface IStationsContext {
    stations: StationTable[];
    setStations: React.Dispatch<React.SetStateAction<StationTable[]>>;
    uniqueCountries: Array<StationTable["country_code"]>;
    setUniqueCountries: React.Dispatch<React.SetStateAction<Array<StationTable["country_code"]>>>;
    uniqueOwners: Array<Pick<StationTable, "code" | "owner_name">>;
    setUniqueOwners: React.Dispatch<React.SetStateAction<Array<Pick<StationTable, "code" | "owner_name">>>>;
    selCountries: Map<StationTable["country_code"], boolean>;
    setSelCountries: React.Dispatch<React.SetStateAction<Map<StationTable["country_code"], boolean>>>;
    selOwners: Map<StationTable["owner_name"], boolean>;
    setSelOwners: React.Dispatch<React.SetStateAction<Map<StationTable["owner_name"], boolean>>>;
    filteredStations: StationTable[];
    getCount: (checks:Map<string, boolean>)=>number;
}