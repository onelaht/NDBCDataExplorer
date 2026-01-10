import type {Station} from "./Station.ts";

export type Initializer = {
    stations: Station[];
    uCountries: Array<Station["country_code"]>;
    uOwners: Array<Pick<Station, "code" | "owner_name">>
}