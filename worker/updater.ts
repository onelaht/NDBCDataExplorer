// cheerio
import * as cheerio from "cheerio";
// db access
import {stations} from "./db/stations.ts";
import {stations_owner} from "./db/stations_owner.ts";
import {stations_datatype} from "./db/stations_datatype";
// types and intefaces
import type {IDataSet} from "../types/IDataSet";

export function updater(db:D1Database) {
    // initialize stations table
    const db_stations = stations(db);
    const db_stations_owner = stations_owner(db);
    const db_stations_datatype = stations_datatype(db);

    // fetch station and upsert to db
    async function updateStation() {
        // fetches data from NDBC
        // - returns data as an array of split tuples
        const fetchData = async (input:string)  =>{
            const res = await fetch(input)
            if(res.ok) {
                const text = await res.text();
                return text.split("\n");
            } else
                return [];
        }
        // get station stations
        const stations = await fetchData("https://www.ndbc.noaa.gov/data/stations/station_table.txt");
        const owners = await fetchData("https://www.ndbc.noaa.gov/data/stations/station_owners.txt");
        // pass station to batcher
        await db_stations.batchUpsert(stations);
        await db_stations_owner.batchUpsert(owners);
    }

    // fetch list of data from ndbc
    async function updateListOfData() {
        const createTuple = async (data:Map<string, string[]>) => {
            const arr:IDataSet[] = [];
            data.forEach((v, k) => {
                const typeSet = new Set<string>(v);
                const tuple:IDataSet = {
                    station_id: k,
                    adcp: typeSet.has("adcp") ? 1 : 0,
                    cwind: typeSet.has("cwind") ? 1 : 0,
                    dart: typeSet.has("dart") ? 1 : 0,
                    drift: typeSet.has("drift") ? 1 : 0,
                    ocean: typeSet.has("ocean") ? 1 : 0,
                    rain: typeSet.has("rain") ? 1 : 0,
                    spec: typeSet.has("spec") ? 1 : 0,
                    spectral: typeSet.has("spectral") ? 1 : 0,
                    srad: typeSet.has("srad") ? 1 : 0,
                    supl: typeSet.has("supl") ? 1 : 0,
                    txt: typeSet.has("txt") ? 1 : 0,
                }
                arr.push(tuple);
            })
            await db_stations_datatype.batchUpsert(arr);
        }

        // get url config
        const url = "https://www.ndbc.noaa.gov/data/5day2/"
        // fetch html data from url
        const $ = cheerio.load(await fetch(url).then(res => res.text()));
        // store types of data per station
        const stations = new Map<string, string[]>();
        // loop through list of stations
        $("table tbody tr a").each((_, val) => {
            const data = $(val).text();
            // if no filetype exists, skio
            if (!data.includes("."))
                return;
            // extract station id and data type
            const id = data.substring(0, data.indexOf("_"));
            const type = data.substring(data.indexOf(".") + 1, data.length);
            // if not exists in map, add as new. otherwise, append new type.
            if (!stations.has(id))
                stations.set(id, [type]);
            else
                stations.set(id, [...stations.get(id) ?? [type], type]);
        })
        await createTuple(stations);
        return stations;
    }

    return {updateStation, updateListOfData};
}

