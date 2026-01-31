export interface IMeteorologicalData {
    label: string;
    wdir: number;
    wspd: number;
    gst: number | undefined;
    wvht: number | undefined;
    dpd: number | undefined;
    apd: number | undefined;
    mwd: number | undefined;
    pres: number | undefined;
    atmp: number | undefined;
    wtmp: number | undefined;
    dewp: number | undefined;
    vis: number | undefined;
    ptdy: number | undefined;
    tide: number | undefined;
}