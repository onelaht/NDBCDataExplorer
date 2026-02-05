import type {IDataSet} from "../../types/IDataSet";

export function stations_datatype(db:D1Database) {
    // upsert tuples
    // - if station dataset exists, update existing tuple
    // - if station dataset is new, insert tuple
    async function batchUpsert(tuples:IDataSet[]): Promise<void> {
        // var for storing queries
        const queries:D1PreparedStatement[] = [];
        // prepare statement for upsert
        const req = db.prepare(
            "INSERT INTO " +
            "stations (station_id, adcp, cwind, dart, drift, ocean, rain, spec, spectral, srad, supl, txt, last_updated)" +
            "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, current_timestamp)" +
            "ON CONFLICT(station_id) DO UPDATE SET " +
            "station_id = excluded.station_id, " +
            "adcp = excluded.adcp, " +
            "cwind = excluded.cwind, " +
            "dart = excluded.dart, " +
            "drift = excluded.drift, " +
            "ocean = excluded.ocean, " +
            "rain = excluded.rain, " +
            "spec = excluded.spec, " +
            "spectral = excluded.spectral, " +
            "srad = excluded.srad, " +
            "supl = excluded.supl, " +
            "txt = excluded.txt, " +
            "last_updated = excluded.last_updated " +
            "WHERE " +
            "stations_datatype.adcp IS DISTINCT FROM excluded.acdp OR " +
            "stations_datatype.cwind IS DISTINCT FROM excluded.cwind OR " +
            "stations_datatype.dart IS DISTINCT FROM excluded.dart OR " +
            "stations_datatype.drift IS DISTINCT FROM excluded.drift OR " +
            "stations_datatype.ocean IS DISTINCT FROM excluded.ocean " +
            "stations_datatype.rain IS DISTINCT FROM excluded.rain OR " +
            "stations_datatype.spec IS DISTINCT FROM excluded.spec OR " +
            "stations_datatype.spectral IS DISTINCT FROM excluded.spectral OR " +
            "stations_datatype.srad IS DISTINCT FROM excluded.srad OR " +
            "stations_datatype.supl IS DISTINCT FROM excluded.supl OR " +
            "stations_datatype.txt IS DISTINCT FROM excluded.txt");
        // bind each tuples
        tuples.forEach(t => {
            queries.push(req.bind(t.station_id, t.adcp, t.cwind, t.dart, t.drift, t.ocean, t.rain, t.spec, t.spectral,
                t.srad, t.supl, t.txt));
        })
        // set chunk size as 50
        const chunkSize = 50;
        // request batch based on number of chunk size
        for(let i = 0; i < queries.length; i+=chunkSize) {
            const chunk = queries.slice(i, i + chunkSize);
            await db.batch(chunk);
        }
    }
    return {batchUpsert};
}