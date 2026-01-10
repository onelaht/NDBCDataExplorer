import {updater} from "./updater.ts";
import {retriever} from "./retriever.ts";
import type {Initializer} from "../types/Initializer.ts";

// access to cloudflare dbs
type Env = {
    app_db: D1Database,
}

export default {
    async fetch(request: Request, env: Env) {
    // track current http endpoint and method
    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;

    // retrieve stations_table
    if(path === "/api/stations/" && method === "GET") {
        const r = retriever(env.app_db);
        const test:Initializer = {
            stations: await r.retrieveStations(),
            uCountries: await r.getUniqueCountries(),
            uOwners: await r.getUniqueOwners()
        }
        return new Response(JSON.stringify(test), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        });
    }

    // local debug
    if(path === "/api/crons/" && method === "GET") {
        const d = updater(env.app_db)
        await d.updateStation();
        return new Response(JSON.stringify("k"), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        });
    }

    return new Response(null, { status: 404 });
  },
    // fetch station table via crons
    async scheduled(_controller:ScheduledController, env:Env) {
        const u = updater(env.app_db)
        await u.updateStation();
    }
} satisfies ExportedHandler<Env>;
