import React from "react";
import ProviderInitializer from "./ProviderInitializer.tsx";

export default function ProviderApp({children}:{children: React.ReactNode}) {
    return (
        <ProviderInitializer>
                {children}
        </ProviderInitializer>
    )
}