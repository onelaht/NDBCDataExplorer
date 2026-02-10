import type {IJsonModel} from "flexlayout-react";

export const Layout1:IJsonModel =  {
    global: {},
    borders: [],
    layout: {
        type: "row",
        children: [
            {
                type: "tabset",
                weight: 15,
                children: [
                    {
                        type: "tab",
                        name: "Filters",
                        component: "Filters",
                        borderWidth: 300,
                    }
                ]
            },
            {
                type: "row",
                weight: 50,
                children: [
                    {
                        type: "tabset",
                        weight: 100,
                        children: [
                            {
                                type: "tab",
                                name: "Map",
                                component: "Map",
                            }
                        ]
                    }
                ]
            },
            {
                type: "row",
                weight: 35,
                children: [
                    {
                        type: "tabset",
                        weight: 50,
                        children: [
                            {
                                type: "tab",
                                name: "Metadata",
                                component: "Metadata",
                            }
                        ]
                    },
                    {
                        type: "tabset",
                        weight: 50,
                        children: [
                            {
                                type: "tab",
                                name: "Dataset Chart",
                                component: "DatasetChart",
                            }
                        ]
                    }
                ]
            },
        ]
    }
};