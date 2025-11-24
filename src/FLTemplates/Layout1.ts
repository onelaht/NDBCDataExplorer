import type {IJsonModel} from "flexlayout-react";

export const Layout1:IJsonModel =  {
    global: {},
    borders: [
        {
            type: "border",
            location: "left",
            children: [
                {
                    type: "tab",
                    name: "Filters",
                    component: "Filters",
                    borderWidth: 300,
                }
            ]
        }
    ],
    layout: {
        type: "row",
        weight: 100,
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
            },
        ]
    }
};