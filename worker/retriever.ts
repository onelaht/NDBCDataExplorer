// types and interfaces
import type {IMeteorologicalData} from "../types/IMeteorologicalData";
import type {IMapMarkers} from "../types/IMapMarkers";
import type {IMetadata} from "../types/IMetadata";

export function retriever(db:D1Database) {
    // get map markers
    async function retrieveMapMarkers():Promise<IMapMarkers[]> {
        const {results} = await db.prepare(
            "SELECT s.station_id, s.location, so.code, so.name AS owner_name, so.country_code " +
            "FROM stations AS s JOIN stations_owner AS so " +
            "ON s.owner = so.code"
        ).all<IMapMarkers>();
        results.forEach(s => {
            s.location = normalizeLocation(s.location as string);
        })
        return results;
    }

    // retrieves metadata for specified station id
    async function retrieveMetadata(stationID:string):Promise<IMetadata | null> {
        const results = await db.prepare(
            "SELECT s.station_id, s.ttype, s.hull, s.name AS station_name, s.payload, s.location, " +
            "s.timezone, s.forecast, so.code, so.name AS owner_name, so.country_code " +
            "FROM stations AS s " +
            "JOIN stations_owner AS so " +
            "ON s.owner = so.code " +
            `WHERE s.station_id = '${stationID}'`
        ).first<IMetadata>();
        if(!results) return null;
        results.location = normalizeLocation(results.location as string);
        return results
    }

    // retrieves all unique owners from stations_owners
    // - returns an empty array if empty or error occurs
    async function getDistinctOwners():Promise<string[]> {
        const results =  await db.prepare(
            "SELECT DISTINCT name " +
            "FROM stations_owner"
        ).all<{name: string}>();
        return results.results.map(i => i.name);
    }

    // retrieves all unique countries from stations_owners
    // - returns an empty array if empty or error occurs
    async function getDistinctCountries():Promise<string[]> {
        const results =  await db.prepare(
            "SELECT DISTINCT country_code " +
            "FROM stations_owner"
        ).all<{country_code: string}>();
        return results.results.map(i => i.country_code);
    }

    // retrieve 5 day meteorological data from NDBC
    // - returns an empty array if no data is found
    async function getMeteorologicalData(stationID: string):Promise<IMeteorologicalData[]> {
        const arr:IMeteorologicalData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.txt`);
        // return empty arr if empty
        if(req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col:IMeteorologicalData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}-${tup[5]}`,
                    wdir: parseInt(tup[5]),
                    wspd: parseFloat(tup[6]),
                    gst: tup[7] === "MM" ? undefined : parseFloat(tup[7]),
                    wvht: tup[8] === "MM" ? undefined : parseFloat(tup[8]),
                    dpd: tup[9] === "MM" ? undefined : parseFloat(tup[9]),
                    apd: tup[10] === "MM" ? undefined : parseFloat(tup[10]),
                    mwd: tup[11] === "MM" ? undefined : parseFloat(tup[11]),
                    pres: tup[12] === "MM" ? undefined : parseFloat(tup[12]),
                    atmp: tup[13] === "MM" ? undefined : parseFloat(tup[13]),
                    wtmp: tup[14] === "MM" ? undefined : parseFloat(tup[14]),
                    dewp: tup[15] === "MM" ? undefined : parseFloat(tup[15]),
                    vis: tup[16] === "MM" ? undefined : parseFloat(tup[16]),
                    ptdy: tup[17] === "MM" ? undefined : tup[17].includes("+")
                        ? Math.abs(parseFloat(tup[17])) : parseFloat(tup[17]),
                    tide: tup[18] === "MM" ? undefined : parseFloat(tup[18]),
                }
                arr.push(col);
            }
        }
        return arr;
    }
    return {retrieveMapMarkers, getDistinctCountries, getDistinctOwners, getMeteorologicalData, retrieveMetadata};
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

// convert location to lat/lon
function normalizeLocation(location:string):number[] {
    const splitData = location.split(" ");
    const lat = parseFloat(splitData[0]);
    const lon = parseFloat(splitData[2]);
    return [splitData[1] === "N" ? lat : -lat, splitData[3] === "E" ? lon : -lon]
}