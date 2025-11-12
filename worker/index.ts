import {updater} from "./updater.ts";
import {retriever} from "./retriever.ts";

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
    if(path == "/api/stations/" && method == "GET") {
        const r = retriever(env.app_db);
        const test = await r.retrieveStations()
        return new Response(JSON.stringify(test), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        });
    }
    return new Response(null, { status: 404 });
  },
    // fetch station table via crons
    async scheduled(_controller:ScheduledController, env:Env, ctx:ExecutionContext) {
        const u = updater(env.app_db)
        ctx.waitUntil(u.updateStation())
    }
} satisfies ExportedHandler<Env>;
