// react
import {useMemo, useState} from "react";
// ChartJS componeents
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController,
} from 'chart.js';
// react-chartjs-2 (ChartJS wrapper)
import { Chart } from 'react-chartjs-2';
// MUI components
import {Box} from "@mui/material";
// types and interfaces
import type {IMeteorologicalDriftData} from "../../../types/IMeteorologicalDriftData.ts";
// child component
import {useLocation} from "react-router-dom";
import PromptUser from "../Additional/PromptUser.tsx";
import MeteorologicalDriftChartLoader from "../Loader/ChartLoader/MeteorologicalDriftChartLoader.tsx";

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    LineController,
    BarController
);

export default function MeteorologicalDriftChart() {
    // get router path
    const {pathname} = useLocation();
    // meteor data set used for chartjs
    const [data, setData] = useState<IMeteorologicalDriftData[]>([]);
    // determine if data fetch is completed
    const [isFetched, setIsFetched] = useState(false);
    // chartjs config
    const plotData = useMemo(() => {
        return {
            labels: data?.map(i => i.label),
                datasets: [
            {
                type: "line" as const,
                label: "Wind Direction (degT)",
                borderColor: "rgb(255, 0, 0)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.wdir),
            },
            {
                type: "line" as const,
                label: "Latitude (deg)",
                borderColor: "rgb(0, 0, 255)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.lat),
            },
            {
                type: "line" as const,
                label: "Longitude (deg)",
                borderColor: "rgb(0, 0, 0)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.lon),
            },
            {
                type: "line" as const,
                label: "Wind Direction (degT)",
                borderColor: "rgb(128, 0, 128)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.wdir),
            },
            {
                type: "line" as const,
                label: "Wind Speed (m/s)",
                borderColor: "rgb(0, 255, 0)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.wspd),
            },
            {
                type: "line" as const,
                label: "Gust (m/s)",
                borderColor: "rgb(0, 255, 255)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.gst),
            },
            {
                type: "line" as const,
                label: "Sea Level Pressure (hPa)",
                borderColor: "rgb(0, 128, 255)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.pres),
            },
            {
                type: "line" as const,
                label: "Pressure Tendency (hPa)",
                borderColor: "rgb(128, 255, 128)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.ptdy),
            },
            {
                type: "line" as const,
                label: "Air Temperature (degC)",
                borderColor: "rgb(255, 128, 128)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.atmp),
            },
            {
                type: "line" as const,
                label: "Sea Surface Temperature (degC)",
                borderColor: "rgb(255, 0, 128)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.wtmp),
            },
            {
                type: "line" as const,
                label: "Dew Point Temperature (degC)",
                borderColor: "rgb(128, 0, 255)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.dewp),
            },
            {
                type: "line" as const,
                label: "Significant Wave Height(m)",
                borderColor: "rgb(128, 255, )",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.wvht)
            },
            {
                type: "line" as const,
                label: "Dominant Wave Period (sec)",
                borderColor: "rgb(128, 255, 128)",
                borderWidth: 1,
                fill: false,
                data: data?.map(i => i.dpd),
            },
        ]
        }
    }, [data])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <>
            {pathname === "/" ?
                <PromptUser label={"No station selected"}/>
            : !isFetched ?
                        <MeteorologicalDriftChartLoader
                            setTypeData={(val) => setData(val)}
                            setIsFetched={(val) => setIsFetched(val)} />
                    :
                        data?.length > 0 ?
                                <Box sx={{display: "flex", width: "100%", height: "100%"}}>
                                    <Chart type='line' data={plotData} options={options} />
                                </Box>
                            :
                                <PromptUser label={"No meteorological data found"}/>

            }
        </>
    )
}