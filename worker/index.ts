import {updater} from "./updater.ts";

// access to cloudflare dbs
type Env = {
    app_db: D1Database,
}

export default {
    async fetch(request: Request) {
    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;

    if(path == "/api/stations/" && method == "GET") {
        return new Response("test", {
            status: 200,
            headers: {"Context-Type": "text/plain"}
        });
    }
    return new Response(null, { status: 404 });
  },

    // fetch station table via crons
    async scheduled(controller:ScheduledController, env:Env, ctx:ExecutionContext) {
        const u = updater(env.app_db)
        ctx.waitUntil(u.updateStation())
    }

} satisfies ExportedHandler<Env>;
