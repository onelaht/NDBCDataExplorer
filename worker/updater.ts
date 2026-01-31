// db access
import {stations} from "./db/stations.ts";
import {stations_owner} from "./db/stations_owner.ts";

export function updater(db:D1Database) {
    // initialize stations table
    const db_stations = stations(db);
    const db_stations_owner = stations_owner(db);

    // fetch station and upsert to db
    async function updateStation (){
        // get station stations
        const stations = await fetchData("https://www.ndbc.noaa.gov/data/stations/station_table.txt");
        const owners = await fetchData("https://www.ndbc.noaa.gov/data/stations/station_owners.txt");
        // pass station to batcher
        await db_stations.batchUpsert(stations);
        await db_stations_owner.batchUpsert(owners);
    }
    return {updateStation};
}

//--------------------------------
//    helpers
//--------------------------------

// fetches data from NDBC
// returns data as an array of split tuples
async function fetchData(input:string) {
    const res = await fetch(input)
    if(res.ok) {
        const text = await res.text();
        return text.split("\n");
    } else
        return [];
}