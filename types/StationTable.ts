export type StationTable = {
    station_id: string;
    owner: string;
    ttype: string;
    hull: string;
    name: string;
    payload: string;
    location: string | number[];
    timezone: string;
    forecast: string;
    note: string;
    timestamp: string;
}