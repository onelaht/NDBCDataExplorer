// list of attributes (flexlayout template)
interface chartComponentAttributes {
    id: string,
    name: string,
    component: string,
}

// attributes per datatype
export const chartLayoutComponents:Map<string, chartComponentAttributes> = new Map<string, chartComponentAttributes>([
    ["txt", {
        id: "meteorological_chart_tab",
        name: "Meteorological Chart",
        component: "MeteorologicalChart",
    }],
    ["drift", {
        id: "drift_chart_tab",
        name: "Drift Chart",
        component: "DriftChart"
    }],
    ["cwind", {
        id: "cont_wind_chart_tab",
        name: "Continuous Winds Chart",
        component: "ContinuousWindChart",
    }],
    ["supl", {
        id: "supplemental_chart_tab",
        name: "Supplemental Chart",
        component: "SupplementalChart",
    }],
    ["ocean", {
        id: "oceanographic_chart_tab",
        name: "Oceanographic Chart",
        component: "OceanographicChart",
    }],
    ["dart", {
        id: "dart_tsunameters_chart_tab",
        name: "DART (Tsunameters) Chart",
        component: "DartTsunametersChart",
    }],
    ["rain", {
        id: "rain_measurements_chart_tab",
        name: "Rain Measurements Chart",
        component: "RainMeasurementsChart",
    }],
    ["spec", {
        id: "spectral_wave_summary_chart_tab",
        name: "Spectral Wave Summary Chart",
        component: "SpectralWaveSummaryChart",
    }],
    ["srad", {
        id: "solar_radiation_chart_tab",
        name: "Solar Radiation Chart",
        component: "SolarRadiationChart"
    }]
])