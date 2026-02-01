import type {IStationData} from "./IStationData";

export interface IMapMarkers {
    station_id: IStationData["station_name"];
    location: IStationData["location"];
    code: IStationData["code"];
    owner_name: IStationData["owner_name"];
    country_code: IStationData["country_code"];
}