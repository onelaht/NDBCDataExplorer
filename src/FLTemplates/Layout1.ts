import type {IJsonModel} from "flexlayout-react";

export const Layout1:IJsonModel =  {
    global: {},
    borders: [],
    layout: {
        id: "col_a",
        type: "row",
        children: [
            {
                id: "col_a_tabset",
                type: "tabset",
                weight: 15,
                children: [
                    {
                        id: "filters_tab",
                        type: "tab",
                        name: "Filters",
                        component: "Filters",
                        borderWidth: 300,
                    }
                ]
            },
            {
                id: "col_b",
                type: "row",
                weight: 50,
                children: [
                    {
                        id: "col_b_tabset",
                        type: "tabset",
                        weight: 100,
                        children: [
                            {
                                id: "map_tab",
                                type: "tab",
                                name: "Map",
                                component: "Map",
                            }
                        ]
                    }
                ]
            },
            {
                id: "col_c",
                type: "row",
                weight: 35,
                children: [
                    {
                        id: "col_c_tabset_1",
                        type: "tabset",
                        weight: 50,
                        children: [
                            {
                                id: "metadata_placeholder",
                                type: "tab",
                                name: "No Station Selected",
                                component: "Placeholder",
                            }
                        ]
                    },
                    {
                        id: "col_c_tabset_2",
                        type: "tabset",
                        weight: 50,
                        children: [
                            {
                                id: "chart_placeholder",
                                type: "tab",
                                name: "No Station Selected",
                                component: "Placeholder",
                            }
                        ],
                    },
                ]
            },
        ]
    }
};