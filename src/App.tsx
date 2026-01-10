// react
import {useState} from "react";
// flexlayout
import {Layout, Model} from 'flexlayout-react'
import 'flexlayout-react/style/light.css';
// flexlayout types
import {TabNode} from "flexlayout-react";
// flexlayout template
import {Layout1} from "./FLTemplates/Layout1.ts";
// react router
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
// split components
import MapLayer from "./FLComponents/MapLayer.tsx";
import ProviderApp from "./Providers/ProviderApp.tsx";
import Filters from "./FLComponents/Filters.tsx";
import StationData from "./FLComponents/StationData.tsx";


function AppInner() {
    const [model] = useState<Model>(Model.fromJson(Layout1));

    const factory = (node:TabNode) => {
        const component = node.getComponent();
        if(component === "Map")
            return <MapLayer/>
        if(component === "Filters")
            return <Filters/>
        if(component === "Initializer")
            return <StationData/>
        if(component === "Placeholder") {
            return <div>{node.getName()}</div>
        }
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Layout
                        model={model}
                        factory={factory}
                    />
                }
                />
                <Route path="/:sID" element={
                    <Layout
                        model={model}
                        factory={factory}
                    />
                }
               />
            </Routes>
        </Router>
    )
}

export default function App() {
    return (
        <ProviderApp>
            <AppInner/>
        </ProviderApp>
    )
}