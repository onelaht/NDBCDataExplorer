import type {StationTableUpsert, StationTableTuple} from "../../types/StationTable.ts";

export function stations(db:D1Database) {
    // upsert tuples
    // - if station_id exists, update existing tuple
    // - if station_id is new, insert tuple
    async function upsert(s:StationTableUpsert): Promise<void> {
        await db
            .prepare(
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
                "last_updated = excluded.last_updated")
            .bind(s.station_id, s.owner, s.ttype, s.hull, s.name, s.payload, s.location, s.timezone, s.forecast, s.note)
            .run();
    }

    // returns all existing stations in stations table
    async function getAll():Promise<StationTableTuple[]> {
        const res = await db
            .prepare(
                "SELECT *" +
                "FROM stations")
            .all<StationTableTuple>();
        return res?.results ?? [];
    }

    return {upsert, getAll};
}