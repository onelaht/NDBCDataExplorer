// react
import {useState} from "react";
// react-router (get pathname)
import {useLocation} from "react-router-dom";
// mui components
import {Box, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
// types and interfaces
import type {IMetadata} from "../../types/IMetadata.ts";
// child component
import MetadataLoader from "./Loader/MetadataLoader.tsx";
import PromptUser from "./Additional/PromptUser.tsx";

export default function Metadata() {
    // get router path
    const {pathname} = useLocation();
    // station metadata
    const [metadata, setMetadata] = useState<IMetadata | null>(null);
    // determine if data fetch is completed
    const [isFetched, setIsFetched] = useState<boolean>(false);
    // reformat property name
    const pretty = (value:string) => {
        switch(value) {
            case "station_id":
                return "Station ID";
            case "station_name":
                return "Station Name";
            case "owner_name":
                return "Owner Name";
            case "country_code":
                return "Country Code";
            case "ttype":
                return value.charAt(1).toUpperCase() + value.slice(2);
            default:
                return value.charAt(0).toUpperCase() + value.slice(1);
        }
    }

    return (
        <>
            {!isFetched ?
                <MetadataLoader
                    setMetadata={val => setMetadata(val)}
                    setIsFetched={val => setIsFetched(val)}/>
            :
                pathname === "/" ?
                    <PromptUser label={"No station selected"}/>
            :
                !metadata ?
                    <PromptUser label={"No metadata found"}/>
            :
                <Box>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Properties</b></TableCell>
                                    <TableCell><b>Values</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                    {Object.entries(metadata)?.map(([k, v]) => (
                                        <TableRow>
                                            <TableCell>{pretty(k)}</TableCell>
                                            <TableCell>{v}</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            }
        </>
    )
}