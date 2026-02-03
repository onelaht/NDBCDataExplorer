export interface IMetadata {
    station_id: string;
    ttype: string;
    hull: string;
    name: string;
    payload: string;
    location: string | number[];
    timezone: string;
    forecast: string;
    code: string,
    owner_name: string;
    country_code: string;
}