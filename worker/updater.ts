// db access
import {stations} from "./db/stations.ts";

export function updater(db:D1Database) {
    // initialize stations table
    const db_stations = stations(db);

    // fetch station and upsert to db
    async function updateStation (){
        // get station tuples
        const tuples = await getStationTable();
        // pass station to batcher
        await db_stations.batchUpsert(tuples);
    }
    return {updateStation};
}

//--------------------------------
//    helpers
//--------------------------------

// fetches station tables from JDBC
// returns data as an array of split tuples
async function getStationTable() {
    const res = await fetch("https://www.ndbc.noaa.gov/data/stations/station_table.txt")
    const text = await res.text();
    return text.split("\n");
}