export interface IMapMarkersFlat {
    station_id: string;
    location: string | number[];
    code: string;
    owner_name: string;
    country_code: string;
    adcp: number;
    cwind: number;
    dart: number;
    drift: number;
    ocean: number;
    rain: number;
    spec: number;
    spectral: number;
    srad: number;
    supl: number;
    txt: number;
}