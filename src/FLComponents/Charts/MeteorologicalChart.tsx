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
import type {IMeteorologicalData} from "../../../types/IMeteorologicalData.ts";
// child component
import MeteorologicalChartLoader from "../Loader/ChartLoader/MeteorologicalChartLoader.tsx";
import {useLocation} from "react-router-dom";
import PromptUser from "../Additional/PromptUser.tsx";

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

export default function MeteorologicalChart() {
    // get router path
    const {pathname} = useLocation();
    // meteor data set used for chartjs
    const [meteor, setMeteor] = useState<IMeteorologicalData[]>([]);
    // determine if data fetch is completed
    const [isFetched, setIsFetched] = useState(false);
    // chartjs config
    const data = useMemo(() => {
        return {
            labels: meteor?.map(i => i.label),
                datasets: [
            {
                type: "line" as const,
                label: "Wind Direction (degT)",
                borderColor: "rgb(255, 0, 0)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.wdir),
            },
            {
                type: "line" as const,
                label: "Wind Speed (m/s)",
                borderColor: "rgb(0, 0, 255)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.wspd),
            },
            {
                type: "line" as const,
                label: "Gust (m/s)",
                borderColor: "rgb(0, 0, 0)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.gst),
            },
            {
                type: "line" as const,
                label: "Wave Height (m)",
                borderColor: "rgb(128, 0, 128)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.wvht),
            },
            {
                type: "line" as const,
                label: "Dominant Wave Period (sec)",
                borderColor: "rgb(0, 255, 0)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.dpd),
            },
            {
                type: "line" as const,
                label: "Average Wave Period (sec)",
                borderColor: "rgb(0, 255, 255)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.apd),
            },
            {
                type: "line" as const,
                label: "Wave Direction (degT)",
                borderColor: "rgb(0, 128, 255)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.mwd),
            },
            {
                type: "line" as const,
                label: "Sea Level Pressure (hPa)",
                borderColor: "rgb(128, 255, 128)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.pres),
            },
            {
                type: "line" as const,
                label: "Air Temperature (degC)",
                borderColor: "rgb(255, 128, 128)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.atmp),
            },
            {
                type: "line" as const,
                label: "Sea Surface Temperature (degC)",
                borderColor: "rgb(255, 0, 128)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.wtmp),
            },
            {
                type: "line" as const,
                label: "Dew Point Temperature (degC)",
                borderColor: "rgb(128, 0, 255)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.dewp),
            },
            {
                type: "line" as const,
                label: "Station Visibility (nmi)",
                borderColor: "rgb(128, 255, )",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.vis),
            },
            {
                type: "line" as const,
                label: "Pressure Tendency (hPa)",
                borderColor: "rgb(255, 128, 64)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.ptdy),
            },
            {
                type: "line" as const,
                label: "Tide (ft)",
                borderColor: "rgb(128, 255, 128)",
                borderWidth: 1,
                fill: false,
                data: meteor?.map(i => i.tide),
            },
        ]
        }
    }, [meteor])

    const options = {
        responsive: true,
        maintainAspectRatio: false,
    }

    return (
        <>
            {pathname === "/" ?
                <PromptUser label={"No station selected"}/>
            : !isFetched ?
                        <MeteorologicalChartLoader
                            setTypeData={(val) => setMeteor(val)}
                            setIsFetched={(val) => setIsFetched(val)} />
                    :
                        meteor?.length > 0 ?
                                <Box sx={{display: "flex", width: "100%", height: "100%"}}>
                                    <Chart type='line' data={data} options={options} />
                                </Box>
                            :
                                <PromptUser label={"No meteorological data found"}/>

            }
        </>
    )
}