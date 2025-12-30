export function stations_owner(db:D1Database) {
    // upsert tuples
    // - if owners already exists, update existing tuple
    // - if owners is new, insert tuple
    async function batchUpsert(tuples:string[]): Promise<void> {
        // var for storing queries
        const queries:D1PreparedStatement[] = [];
        // prepare statement for upsert
        const req = db.prepare(
            "INSERT INTO " +
            "stations_owner (code, name, country_code, last_updated) " +
            "VALUES (?, ?, ?, current_timestamp) " +
            "ON CONFLICT (code) DO UPDATE SET " +
            "code = excluded.code, " +
            "name = excluded.name, " +
            "country_code = excluded.country_code, " +
            "last_updated = last_updated " +
            "WHERE " +
            "stations_owner.name IS DISTINCT FROM excluded.name OR " +
            "stations_owner.country_code IS DISTINCT FROM excluded.country_code")
        // bind each tuples
        for(let i = 2; i < tuples.length; i++) {
            const att:string[] = tuples[i].split("|");
            if(att.length === 3) {
                queries.push(req.bind((att[0].trimEnd()).trimStart(), (att[1].trimEnd()).trimStart(),
                    (att[2].trimEnd()).trimStart()));
            }
        }
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