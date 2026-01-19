import {useLocation} from "react-router-dom";
import {useStations} from "../Providers/ProviderStations.tsx";
import {useEffect, useState} from "react";
import type {IStation} from "../../types/IStation.ts";
import type {IStationData} from "../../types/IStationData.ts";
import {Accordion, AccordionDetails, AccordionSummary, Box, Typography, Table, TableContainer, TableHead, TableRow, TableCell, TableBody} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function StationData() {
    const {pathname} = useLocation();
    const {stations} = useStations();
    const [station, setStation] = useState<IStation | null>(null);
    const sID = pathname.substring(1, pathname.length);

    useEffect(() => {
        console.log(sID);
        // ignore if station id is invalid
        if(!stations?.get(sID))
            return;
        // retrieve station
        const s:IStation = {
            station_id: sID,
            data: stations.get(sID) as IStationData
        }
        // assign as selected station
        setStation(s ?? null);
    }, [pathname, sID, stations]);

    useEffect(() => {
        console.log(station);
    }, [station])

    return (
        <Box sx={{
            m: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "top",
            gap: 1
        }}>
            {sID === "" ?
                <Typography variant="h5" sx={{alignSelf:"center"}}>
                    No Station Selected
                </Typography>
                :
                stations.has(sID) ?
                    <>
                        <Typography variant="h5" sx={{alignSelf: "center"}}>
                            Station ID: {station?.station_id.toUpperCase()}
                        </Typography>
                        <Accordion sx={{width: "100%"}}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                                <Typography>
                                    Metadata
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>
                                                    <b>Properties</b>
                                                </TableCell>
                                                <TableCell>
                                                    <b>Values</b>
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {station?.data && Object.entries(station?.data as IStationData).map(([k, v]) => (
                                                <TableRow>
                                                    <TableCell>
                                                        {k}
                                                    </TableCell>
                                                    <TableCell>
                                                        {(v === "" || v === " ") ? "?" : v}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    </>
                :
                <Typography variant="h5" sx={{alignSelf:"center"}}>
                    Invalid Station ID
                </Typography>
            }
        </Box>
    )
}