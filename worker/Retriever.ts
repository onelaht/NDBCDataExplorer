// types and interfaces
import type {IMapMarkersFlat} from "../types/IMapMarkersFlat";
import type {IMapMarkers} from "../types/IMapMarkers";
import type {IMetadata} from "../types/IMetadata";
import type {IDataSet} from "../types/IDataSet";

export class Retriever {
    private db:D1Database;

    constructor(db:D1Database) {
        this.db = db;
    }

    // get map markers
    public async retrieveMapMarkers():Promise<IMapMarkers[]> {
        const {results} = await this.db.prepare(
            "SELECT s.station_id, s.location, so.code, so.name AS owner_name, so.country_code, " +
            "sd.adcp, sd.cwind, sd.dart, sd.drift, sd.ocean, sd.rain, sd.spec, sd.spectral, " +
            "sd.srad, sd.supl, sd.txt " +
            "FROM stations AS s JOIN stations_owner AS so JOIN stations_datatype as sd " +
            "ON s.owner = so.code AND s.station_id = sd.station_id"
        ).all<IMapMarkersFlat>();
        results.forEach(s => {
            s.location = normalizeLocation(s.location as string);
        })
        return convertFlatType(results);
    }

    // retrieves metadata for specified station id
    public async retrieveMetadata(stationID:string):Promise<IMetadata | null> {
        const results = await this.db.prepare(
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
    public async getDistinctOwners():Promise<string[]> {
        const results =  await this.db.prepare(
            "SELECT DISTINCT name " +
            "FROM stations_owner"
        ).all<{name: string}>();
        return results.results.map(i => i.name);
    }

    // retrieves all unique countries from stations_owners
    // - returns an empty array if empty or error occurs
    public async getDistinctCountries():Promise<string[]> {
        const results =  await this.db.prepare(
            "SELECT DISTINCT country_code " +
            "FROM stations_owner"
        ).all<{country_code: string}>();
        return results.results.map(i => i.country_code);
    }

    // retrieves all existing datatypes per station
    // - returns an empty array if empty or error occurs
    public async getStationDatatype(stationID:string):Promise<string[]> {
        const result = await this.db.prepare(
            "SELECT station_id, adcp, cwind, dart, drift, ocean, rain, spec, spectral, srad, supl, txt " +
            "FROM stations_datatype " +
            "WHERE station_id = " + `"${stationID}"`
        ).first<IDataSet>();
        if(!result) return [];
        const arr:string[] = [];
        Object.entries(result).forEach(([key, value]:[string, number]) => {
            if(value === 1)
                arr.push(key);
        })
        return arr;
    }
}

//--------------------------------
//    helpers
//--------------------------------

// insert datasets attributes to string array type
function convertFlatType(data:IMapMarkersFlat[]) {
    const temp:IMapMarkers[] = [];
    const datatypes: Set<string> = new Set(["adcp", "cwind", "dart", "drift", "drift", "ocean", "rain", "spec",
        "spectral", "srad", "supl", "txt"]);
    if(data.length < 1) return temp;
    data.forEach(i => {
        const s:string[] = [];
        // assign existing types to array
        Object.entries(i).forEach(([key, value]:[string, number]) => {
            if(datatypes.has(key) && value === 1)
                s.push(key);
        })
        // create tuple type
        const tuple:IMapMarkers = {
            station_id: i.station_id,
            location: i.location,
            code: i.code,
            owner_name: i.owner_name,
            country_code: i.country_code,
            datatypes: s,
        }
        temp.push(tuple);
    })
    return temp;
}

// convert location to lat/lon
function normalizeLocation(location:string):number[] {
    const splitData = location.split(" ");
    const lat = parseFloat(splitData[0]);
    const lon = parseFloat(splitData[2]);
    return [splitData[1] === "N" ? lat : -lat, splitData[3] === "E" ? lon : -lon]
}