export interface IOceanData {
    label: string;
    depth: number;
    otmp: number;
    cond: number;
    sal: number;
    o2: number | undefined;
    o2ppm: number | undefined;
    clcon: number | undefined;
    turb: number | undefined;
    ph: number | undefined;
    eh: number | undefined;
}