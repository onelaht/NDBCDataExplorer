export type StationTableUpsert = {
    station_id: string;
    owner: string;
    ttype: string;
    hull: string;
    name: string;
    payload: string;
    location: string;
    timezone: string | number[];
    forecast: string;
    note: string;
}

export type StationTableTuple = StationTableUpsert & {
    timestamp: string;
}