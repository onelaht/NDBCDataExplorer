export interface IMeteorologicalDriftData {
    label: string;
    lat: number;
    lon: number;
    wdir: number;
    wspd: number;
    gst: number | undefined;
    pres: number | undefined;
    ptdy: number | undefined;
    atmp: number | undefined;
    wtmp: number | undefined;
    dewp: number | undefined;
    wvht: number | undefined;
    dpd: number | undefined;
}