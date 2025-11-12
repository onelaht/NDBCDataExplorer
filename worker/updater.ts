import type {StationTableUpsert} from "../types/StationTable.ts";
// db access
import {stations} from "./db/stations.ts";

export function updater(db:D1Database) {
    // initialize stations table
    const db_stations = stations(db);

    // fetch station and upsert to db
    async function updateStation (){
        // get station tuples
        const tup = await getStationTable();
        // assign each tuple to table
        for(let i = 2; i < tup.length; i++) {
            const att = tup[i].split('|');
            if(att.length == 10) {
                const upsert:StationTableUpsert = {
                    station_id: att[0],
                    owner: att[1],
                    ttype: att[2],
                    hull: att[3],
                    name: att[4],
                    payload: att[5],
                    location: att[6],
                    timezone: att[7],
                    forecast: att[8],
                    note: att[9]
                }
                await db_stations.upsert(upsert);
            }
        }
    }
    return {updateStation};
}

/*
------------------------------------------
    helpers
-----------------------wrangler-------------------
*/

// fetches station tables from JDBC
// returns data as an array of split tuples
async function getStationTable() {
    const res = await fetch("https://www.ndbc.noaa.gov/data/stations/station_table.txt")
    const text = await res.text();
    return text.split("\n");
}