// react
import {useState} from "react";
// flexlayout
import {Layout, Model} from 'flexlayout-react'
import 'flexlayout-react/style/light.css';
// flexlayout types
import {TabNode} from "flexlayout-react";
// flexlayout template
import {Layout1} from "./FLTemplates/Layout1.ts";
// split components
import MapLayer from "./FLComponents/MapLayer.tsx";
import ProviderApp from "./Providers/ProviderApp.tsx";
import Filters from "./FLComponents/Filters.tsx";


function AppInner() {
    const [model] = useState<Model>(Model.fromJson(Layout1));

    const factory = (node:TabNode) => {
        const component = node.getComponent();
        if(component === "Map")
            return <MapLayer/>
        if(component === "Filters")
            return <Filters/>
        if(component === "Placeholder") {
            return <div>{node.getName()}</div>
        }
    }

    return (
        <Layout
            model={model}
            factory={factory}
        />
    )
}

export default function App() {
    return (
        <ProviderApp>
            <AppInner/>
        </ProviderApp>
    )
}