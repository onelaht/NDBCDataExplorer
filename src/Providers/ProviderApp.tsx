import React from "react";
import ProviderStations from "./ProviderStations.tsx";

export default function ProviderApp({children}:{children: React.ReactNode}) {
    return (
        <ProviderStations>
            {children}
        </ProviderStations>
    )
}