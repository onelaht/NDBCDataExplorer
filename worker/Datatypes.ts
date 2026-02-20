// dataset types
import type {IMeteorologicalData} from "../types/IMeteorologicalData.ts";
import type {IMeteorologicalDriftData} from "../types/IMeteorologicalDriftData.ts";
import type {ICWindData} from "../types/ICWindData.ts";
import type {ISupplementalData} from "../types/ISupplementalData.ts";
import type {IOceanData} from "../types/IOceanData.ts";
import type {IDartData} from "../types/IDartData.ts";
import type {IHourlyRainData} from "../types/IHourlyRainData.ts";
import type {ISolarRadiationData} from "../types/ISolarRadiationData.ts";
import type {IWaveSummaryData} from "../types/IWaveSummaryData.ts";

export class Datatypes {
    // retrieve 5 day meteorological data from NDBC
    // - returns an empty array if no data is found
    public static async getMeteorologicalData(stationID: string):Promise<IMeteorologicalData[]> {
        const arr:IMeteorologicalData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.txt`);
        // return empty arr if empty
        if(req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col:IMeteorologicalData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}${tup[4]}`,
                    wdir: tup[5] === "MM" ? undefined : parseInt(tup[5]),
                    wspd: tup[6] === "MM" ? undefined : parseFloat(tup[6]),
                    gst: tup[7] === "MM" ? undefined : parseFloat(tup[7]),
                    wvht: tup[8] === "MM" ? undefined : parseFloat(tup[8]),
                    dpd: tup[9] === "MM" ? undefined : parseFloat(tup[9]),
                    apd: tup[10] === "MM" ? undefined : parseFloat(tup[10]),
                    mwd: tup[11] === "MM" ? undefined : parseFloat(tup[11]),
                    pres: tup[12] === "MM" ? undefined : parseFloat(tup[12]),
                    atmp: tup[13] === "MM" ? undefined : parseFloat(tup[13]),
                    wtmp: tup[14] === "MM" ? undefined : parseFloat(tup[14]),
                    dewp: tup[15] === "MM" ? undefined : parseFloat(tup[15]),
                    vis: tup[16] === "MM" ? undefined : parseFloat(tup[16]),
                    ptdy: tup[17] === "MM" ? undefined : tup[17].includes("+")
                        ? Math.abs(parseFloat(tup[17])) : parseFloat(tup[17]),
                    tide: tup[18] === "MM" ? undefined : parseFloat(tup[18]),
                }
                arr.push(col);
            }
        }
        return arr;
    }

    public static async getMeteorologicalDriftData(stationID: string):Promise<IMeteorologicalDriftData[]> {
        const arr:IMeteorologicalDriftData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.drift`);
        // return empty arr if empty
        if(req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col:IMeteorologicalDriftData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}`,
                    lat: parseFloat(tup[4]),
                    lon: parseFloat(tup[5]),
                    wdir: tup[6] === "MM" ? undefined : parseFloat(tup[6]),
                    wspd: tup[7] === "MM" ? undefined : parseFloat(tup[7]),
                    gst: tup[8] === "MM" ? undefined : parseFloat(tup[8]),
                    pres: tup[9] === "MM" ? undefined : parseFloat(tup[9]),
                    ptdy: tup[10] === "MM" ? undefined : tup[10].includes("+")
                        ? Math.abs(parseFloat(tup[10])) : parseFloat(tup[10]),
                    atmp: tup[11] === "MM" ? undefined : parseFloat(tup[11]),
                    wtmp: tup[12] === "MM" ? undefined : parseFloat(tup[12]),
                    dewp: tup[13] === "MM" ? undefined : parseFloat(tup[13]),
                    wvht: tup[14] === "MM" ? undefined : parseFloat(tup[14]),
                    dpd: tup[15] === "MM" ? undefined : parseFloat(tup[15]),
                }
                arr.push(col);
            }
        }
        return arr;
    }

    public static async getContinuousWindData(stationID: string):Promise<ICWindData[]> {
        const arr:ICWindData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.cwind`);
        // return empty arr if empty
        if(req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col:ICWindData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}`,
                    wdir: parseInt(tup[5]),
                    wspd: parseFloat(tup[6]),
                    gdr: parseFloat(tup[7]),
                    gst: parseFloat(tup[8]),
                    gtime: parseInt(tup[9]),
                }
                arr.push(col);
            }
        }
        return arr;
    }

    public static async getSupplementalData(stationID: string):Promise<ISupplementalData[]> {
        const arr:ISupplementalData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.supl`);
        // return empty arr if empty
        if(req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col:ISupplementalData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}`,
                    pres: tup[5] === "MM" ? undefined : parseFloat(tup[5]),
                    ptime: tup[6] === "MM" ? undefined: parseInt(tup[5]),
                    wspd: parseInt(tup[7]),
                    wdir: parseInt(tup[8]),
                    wtime: parseInt(tup[9]),
                }
                arr.push(col);
            }
        }
        return arr;
    }

    public static async getOceangraphicData(stationID: string):Promise<IOceanData[]> {
        const arr: IOceanData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.ocean`);
        // return empty arr if empty
        if (req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col: IOceanData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}`,
                    depth: parseFloat(tup[5]),
                    otmp: parseFloat(tup[6]),
                    cond: tup[7] === "MM" ? undefined : parseFloat(tup[7]),
                    sal: parseFloat(tup[8]),
                    o2: tup[8] === "MM" ? undefined : parseFloat(tup[8]),
                    o2ppm: tup[9] === "MM" ? undefined : parseFloat(tup[9]),
                    clcon: tup[10] === "MM" ? undefined : parseFloat(tup[10]),
                    turb: tup[11] === "MM" ? undefined : parseFloat(tup[11]),
                    ph: tup[12] === "MM" ? undefined : parseFloat(tup[12]),
                    eh: tup[13] === "MM" ? undefined : parseFloat(tup[13]),
                }
                arr.push(col);
            }
        }
        return arr;
    }

    public static async getDartData(stationID: string):Promise<IDartData[]> {
        const arr: IDartData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.dart`);
        // return empty arr if empty
        if (req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col: IDartData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}`,
                    type: parseInt(tup[6]),
                    height: parseFloat(tup[7]),
                }
                arr.push(col);
            }
        }
        return arr;
    }

    public static async getRainData(stationID: string):Promise<IHourlyRainData[]> {
        const arr: IHourlyRainData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.rain`);
        // return empty arr if empty
        if (req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col: IHourlyRainData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}`,
                    accum: parseFloat(tup[5]),
                }
                arr.push(col);
            }
        }
        return arr;
    }

    public static async getSolarRadiationData(stationID: string):Promise<ISolarRadiationData[]> {
        const arr: ISolarRadiationData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.srad`);
        // return empty arr if empty
        if (req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col: ISolarRadiationData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}`,
                    srad1: tup[5] ? undefined : parseFloat(tup[5]),
                    swrad: tup[6] ? undefined : parseFloat(tup[6]),
                    lwrad: tup[7] ? undefined : parseFloat(tup[7]),
                }
                arr.push(col);
            }
        }
        return arr;
    }

    public static async getWaveSummaryData(stationID: string):Promise<IWaveSummaryData[]> {
        const arr: IWaveSummaryData[] = []
        // get data
        const req = await fetchData(`https://www.ndbc.noaa.gov/data/5day2/${stationID}_5day.srad`);
        // return empty arr if empty
        if (req.length > 2) {
            for (let i = req.length - 2; i > 3; i--) {
                // split attributes (based on tab or space)
                const tup = req[i].split(/\s+/);
                // push data
                const col: IWaveSummaryData = {
                    label: `${tup[0]}-${tup[1]}-${tup[2]}-${tup[3]}-${tup[4]}`,
                    wvht: parseFloat(tup[5]),
                    swh: parseFloat(tup[6]),
                    swp: parseFloat(tup[7]),
                    wwh: parseFloat(tup[8]),
                    wwp: parseFloat(tup[9]),
                    swd: tup[10],
                    wwd: tup[11],
                    steepness: tup[12],
                    apd: parseFloat(tup[13]),
                    mwd: parseInt(tup[14])
                }
                arr.push(col);
            }
        }
        return arr;
    }
}

//--------------------------------
//    helpers
//--------------------------------

// fetches data from NDBC
// returns data as an array of split tuples
async function fetchData(input:string) {
    const res = await fetch(input)
    if(res.ok) {
        const text = await res.text();
        return text.split("\n");
    } else
        return [];
}