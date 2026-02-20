import {updater} from "./updater.ts";
import {Retriever} from "./Retriever.ts";
import {Datatypes} from "./Datatypes";
import type {IMapMarkers} from "../types/IMapMarkers";
import type {IMetadata} from "../types/IMetadata";
import type {IFilterSet} from "../types/IFilterSet";

// access to cloudflare dbs
type Env = {
    app_db: D1Database,
}
// request payloads
type id = {
    stationID: string
}
type id_type = {
    stationID: string,
    type: string,
}

export default {
    async fetch(request: Request, env: Env) {
    // track current http endpoint and method
    const url = new URL(request.url);
    const method = request.method;
    const path = url.pathname;
    const r = new Retriever(env.app_db);

    // retrieve map markers
    if(path === "/api/getMapMarkers/" && method === "GET") {
        const data:IMapMarkers[] = await r.retrieveMapMarkers();
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        });
    }

    // retrieve filter set
    if(path === "/api/getFilterSet/" && method === "GET") {
        const data:IFilterSet = {
            distinctOwners: await r.getDistinctOwners(),
            distinctCountries: await r.getDistinctCountries(),
        };
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        });
    }

    // retrieve map markers
    if(path === "/api/getMetadata/" && method === "POST") {
        const req:id|null = await getRequest<id>(request);
        const data:IMetadata|null = req ? await r.retrieveMetadata(req.stationID) : null
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        });
    }

    // retrieve avail datatype based on specified station id
    if(path === "/api/getDatatype/" && method === "POST") {
        const req:id|null = await getRequest<id>(request);
        return new Response(JSON.stringify(req ? await r.getStationDatatype(req.stationID) : null), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        });
    }

    // local debug
    if(path === "/api/crons/" && method === "GET") {
        const d = updater(env.app_db)
        await d.updateStation();
        await d.updateListOfData();
        return new Response(JSON.stringify("k"), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        });
    }

    // return meteorological based provided station id
    if(path === "/api/getTXT/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getMeteorologicalData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    // return meteorological drift date based provided station id
    if(path === "/api/getDRIFT/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getMeteorologicalDriftData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    // return continuous wind date based provided station id
    if(path === "/api/getCWIND/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getContinuousWindData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    // return supplemental databased provided station id
    if(path === "/api/getSUPL/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getSupplementalData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    // return oceanographic data based provided station id
    if(path === "/api/getOCEAN/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getOceangraphicData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    // return dart data based provided station id
    if(path === "/api/getDART/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getDartData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    // return hourly rain data based provided station id
    if(path === "/api/getRAIN/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getRainData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    // return wave summary data based provided station id
    if(path === "/api/getSPEC/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getWaveSummaryData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    // return solar radiation data based provided station id
    if(path === "/api/getSRAD/" && method === "POST") {
        const req:id_type|null = await getRequest<id_type>(request);
        const data = req ? await Datatypes.getSolarRadiationData(req.stationID) : null;
        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {"Context-Type": "application/json"}
        })
    }

    return new Response(null, { status: 404 });
  },
    // fetch station table via crons (daily updater)
    async scheduled(_controller:ScheduledController, env:Env) {
        const u = updater(env.app_db)
        await u.updateStation();
        await u.updateListOfData();
    }
} satisfies ExportedHandler<Env>;

// return body request from client
async function getRequest<T>(req:Request): Promise<T | null> {
    const contentType = req.headers.get("content-type");
    if(contentType?.includes("application/json")) {
        return await req.json();
    }
    return null;
}