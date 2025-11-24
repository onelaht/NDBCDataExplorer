import type {StationTable} from "./StationTable";

export type StationData = {
    stations: StationTable[];
    uCountries: Array<StationTable["country_code"]>;
    uOwners: Array<Pick<StationTable, "code" | "owner_name">>
}