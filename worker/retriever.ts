// types and interfaces
import type {IStation} from "../types/IStation.ts";
import type {IStationData} from "../types/IStationData.ts";
import type {IStationTuple} from "../types/IStationTuple.ts";

export function retriever(db:D1Database) {
    // extract stations and normalize location
    async function retrieveStations():Promise<IStation[]> {
        // get all tuples from station table
        const stations:IStation[] = await getStationsData(db);
        // traverse through all stations and normalize location
        stations.forEach((s) => {
            s.data.location = normalizeLocation(s.data.location as string);
        })
        return stations;
    }

    // retrieve unique (no dups) country code
    async function getUniqueCountries():Promise<Array<IStationData["country_code"]>> {
        const res = await db.prepare(
            "SELECT DISTINCT country_code FROM stations_owner").all<IStationData["country_code"]>();
        return res?.results ?? [];
    }

    // retrieve unique (no dups) owner data
    async function getUniqueOwners():Promise<Array<Pick<IStationData, "code" | "owner_name">>> {
        const res = await db.prepare(
            "SELECT DISTINCT code, name FROM stations_owner").all<Pick<IStationData, "code" | "owner_name">>();
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
async function getStationsData(db:D1Database):Promise<IStation[]> {
    const {results} = await db.prepare(
        "SELECT s.station_id, s.ttype, s.hull, s.name AS station_name, s.payload, s.location, " +
        "s.timezone, s.forecast, ss.code, ss.name AS owner_name, ss.country_code " +
        "FROM stations AS s " +
        "JOIN stations_owner AS ss " +
        "ON s.owner = ss.code"
    ).all<IStationTuple>();

    // retrieve and assign each tuples
    const data:IStation[] = results.map(r => ({
        station_id: r.station_id,
        data: {
            ttype: r.ttype,
            hull: r.hull,
            station_name: r.station_name,
            payload: r.payload,
            location: r.location,
            timezone: r.timezone,
            forecast: r.forecast,
            code: r.code,
            owner_name: r.owner_name,
            country_code: r.country_code,
        }
    }))
    return data ?? [];
}