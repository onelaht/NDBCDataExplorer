// types
import type {Station} from "../types/Station.ts";

export function retriever(db:D1Database) {
    // extract stations and normalize location
    async function retrieveStations():Promise<Station[]> {
        // get all tuples from station table
        const stations:Station[] = await getStationsData(db);
        // traverse through all stations and normalize location
        stations.forEach((s) => {
            s.location = normalizeLocation(s.location as string);
        })
        return stations;
    }

    // retrieve unique (no dups) country code
    async function getUniqueCountries():Promise<Array<Station["country_code"]>> {
        const res = await db.prepare(
            "SELECT DISTINCT country_code FROM stations_owner").all<Station["country_code"]>();
        return res?.results ?? [];
    }

    // retrieve unique (no dups) owner data
    async function getUniqueOwners():Promise<Array<Pick<Station, "code" | "owner_name">>> {
        const res = await db.prepare(
            "SELECT DISTINCT code, name FROM stations_owner").all<Pick<Station, "code" | "owner_name">>();
        return res?.results ?? [];
    }


    return {retrieveStations, getUniqueCountries, getUniqueOwners};
}

//--------------------------------
//    helpers
//--------------------------------

// convert location to lat/lon
function normalizeLocation(location:string):number[] {
    const splitData = location.split(" ");
    const lat = parseFloat(splitData[0]);
    const lon = parseFloat(splitData[2]);
    return [splitData[1] === "N" ? lat : -lat, splitData[3] === "E" ? lon : -lon]
}

// retrieve station owners and stations table
async function getStationsData(db:D1Database):Promise<Station[]> {
    const res = await db.prepare(
        "SELECT s.station_id, s.ttype, s.hull, s.name AS station_name, s.payload, s.location, " +
        "s.timezone, s.forecast, ss.code, ss.name AS owner_name, ss.country_code " +
        "FROM stations AS s " +
        "JOIN stations_owner AS ss " +
        "ON s.owner = ss.code"
    ).all<Station>();

    return res?.results ?? [];
}