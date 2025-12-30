import type {StationTable} from "../../types/StationTable.ts";

export function stations(db:D1Database) {
    // upsert tuples
    // - if station_id exists, update existing tuple
    // - if station_id is new, insert tuple
    async function batchUpsert(tuples:string[]): Promise<void> {
        // var for storing queries
        const queries:D1PreparedStatement[] = [];
        // prepare statement for upsert
        const req = db.prepare(
                "INSERT INTO " +
                "stations (station_id, owner, ttype, hull, name, payload, location, timezone, forecast, note, last_updated)" +
                "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, current_timestamp)" +
                "ON CONFLICT(station_id) DO UPDATE SET " +
                "station_id = excluded.station_id, " +
                "owner = excluded.owner, " +
                "ttype = excluded.ttype, " +
                "hull = excluded.hull, " +
                "name = excluded.name, " +
                "payload = excluded.payload, " +
                "location = excluded.location, " +
                "timezone = excluded.timezone, " +
                "forecast = excluded.forecast, " +
                "note = excluded.note, " +
                "last_updated = excluded.last_updated " +
                "WHERE " +
                "stations.owner IS DISTINCT FROM excluded.owner OR " +
                "stations.ttype IS DISTINCT FROM excluded.ttype OR " +
                "stations.hull IS DISTINCT FROM excluded.hull OR " +
                "stations.name IS DISTINCT FROM excluded.name OR " +
                "stations.payload IS DISTINCT FROM excluded.payload OR " +
                "stations.timezone IS DISTINCT FROM excluded.timezone OR " +
                "stations.forecast IS DISTINCT FROM excluded.forecast OR " +
                "stations.note IS DISTINCT FROM excluded.note")
        // bind each tuples
        for(let i = 2; i < tuples.length; i++) {
            const att:string[] = tuples[i].split("|");
            if(att.length == 10)
                queries.push(req.bind(att[0], att[1], att[2], att[3], att[4], att[5], att[6], att[7], att[8], att[9]));
        }
        // set chunk size as 50
        const chunkSize = 50;
        // request batch based on number of chunk size
        for(let i = 0; i < queries.length; i+=chunkSize) {
            const chunk = queries.slice(i, i + chunkSize);
            await db.batch(chunk);
        }
    }
    // returns all existing stations in stations table
    async function getAll():Promise<StationTable[]> {
        const res = await db
            .prepare(
                "SELECT *" +
                "FROM stations")
            .all<StationTable>();
        return res?.results ?? [];
    }
    return {batchUpsert, getAll};
}