import React from "react";
import type {IStationData} from "../../types/IStationData.ts";

export interface IStationsContext {
    stations: Map<string, IStationData>;
    setStations: React.Dispatch<React.SetStateAction<Map<string, IStationData>>>;
    uniqueCountries: Array<IStationData["country_code"]>;
    setUniqueCountries: React.Dispatch<React.SetStateAction<Array<IStationData["country_code"]>>>;
    uniqueOwners: Array<Pick<IStationData, "code" | "owner_name">>;
    setUniqueOwners: React.Dispatch<React.SetStateAction<Array<Pick<IStationData, "code" | "owner_name">>>>;
    selCountries: Map<IStationData["country_code"], boolean>;
    setSelCountries: React.Dispatch<React.SetStateAction<Map<IStationData["country_code"], boolean>>>;
    selOwners: Map<IStationData["owner_name"], boolean>;
    setSelOwners: React.Dispatch<React.SetStateAction<Map<IStationData["owner_name"], boolean>>>;
    filteredStations: Map<string, IStationData>;
    getCount: (checks:Map<string, boolean>)=>number;
}