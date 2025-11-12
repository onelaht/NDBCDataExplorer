// db access
import {stations} from "./db/stations.ts";
import type {StationTableTuple} from "../types/StationTable.ts";

export function retriever(db:D1Database) {
    // initialize stations table
    const db_stations = stations(db);

    // extract stations and normalize location
    async function retrieveStations() {
        //
        const stations:StationTableTuple[] = await db_stations.getAll();
        stations.forEach((s) => {
            console.log(s);
        })
    }

// ***********************
// helpers
// ***********************

    return {retrieveStations};
}