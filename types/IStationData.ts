export interface IStationData {
    ttype: string;
    hull: string;
    station_name: string;
    payload: string;
    location: string | number[];
    timezone: string;
    forecast: string;
    code: string,
    owner_name: string;
    country_code: string;
}