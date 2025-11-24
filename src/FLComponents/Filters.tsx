import {
    Box,
    Accordion,
    Button,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    Divider,
    FormControlLabel,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {useStations} from "../Providers/ProviderStations.tsx";
import React from "react";

export default function Filters() {
    // global vars
    const {uniqueCountries, uniqueOwners, setSelCountries,
           selCountries, setSelOwners, selOwners, getCount} = useStations();

    // toggles selected element
    const handleCheckbox = (key: string, checks:Map<string, boolean>,
            handler:React.Dispatch<React.SetStateAction<Map<string, boolean>>>)=> {
        // leave if element is not found
        if(!checks.has(key)) return;
        // inverse state of element and apply changes
        handler(prev => {
            const temp = new Map<string, boolean>(prev);
            temp.set(key, !checks.get(key));
            return temp;
        })
    }

    // unchecks all elements from specified type
    const handleReset =
            (handler:React.Dispatch<React.SetStateAction<Map<string, boolean>>>) => {
        // disables all enabled element
        handler(prev => {
            const temp = new Map<string, boolean>(prev);
            for(const i of temp.keys()) {
                if(temp.get(i)) temp.set(i, false);
            }
            return temp;
        })
    }

    return (
        <Box sx={{m:1.5}}>
            <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    Countries ({getCount(selCountries)} Selected)
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{display: "flex", flexDirection:"column"}}>
                        <Button
                            onClick={() => handleReset(setSelCountries)}
                            disabled={getCount(selCountries) === 0}
                            variant="outlined">Clear selection
                        </Button>
                        <Divider sx={{mt: 1, mb: 1}} orientation="horizontal"/>
                        {uniqueCountries.length > 0 && uniqueCountries.map((i) => (
                            <>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={() => handleCheckbox(Object.values(i)[0], selCountries, setSelCountries)}
                                        checked={selCountries.get(Object.values(i)[0])}/>} label={Object.values(i)[0]}
                                />
                                <Divider sx={{mt: 1, mb: 1}} orientation="horizontal"/>
                            </>
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                    Owners ({getCount(selOwners)} Selected)
                </AccordionSummary>
                <AccordionDetails>
                    <Box sx={{display: "flex", flexDirection:"column"}}>
                        <Button
                            variant="outlined"
                            onClick={() => handleReset(setSelOwners)}
                            disabled={getCount(selOwners) === 0}
                            >Clear selection
                        </Button>
                        <Divider sx={{mt: 1, mb: 1}} orientation="horizontal"/>
                        {uniqueOwners.length > 0 && uniqueOwners.map((i) => (
                            <>
                                <FormControlLabel
                                    control={<Checkbox
                                        onChange={() => handleCheckbox(Object.values(i)[0], selOwners, setSelOwners)}
                                        checked={selOwners.get(Object.values(i)[0])}/>} label={Object.values(i)[1]}
                                />
                                <Divider sx={{mt: 1, mb: 1}} orientation="horizontal"/>
                            </>
                        ))}
                    </Box>
                </AccordionDetails>
            </Accordion>
        </Box>
    )
}