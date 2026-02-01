import React from "react";
import ProviderStations from "./ProviderStations.tsx";
import ProviderInitializer from "./ProviderInitializer.tsx";

export default function ProviderApp({children}:{children: React.ReactNode}) {
    return (
        <ProviderInitializer>
            <ProviderStations>
                {children}
            </ProviderStations>
        </ProviderInitializer>
    )
}