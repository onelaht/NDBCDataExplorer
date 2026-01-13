import type {IStation} from "./IStation.ts";
import type {IStationData} from "./IStationData.ts";

export type Initializer = {
    stations: IStation[];
    uCountries: Array<IStationData["country_code"]>;
    uOwners: Array<Pick<IStationData, "code" | "owner_name">>
}