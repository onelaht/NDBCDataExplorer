// react
import React, {useState} from "react";
// mui components
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
// mui icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// global vars
import {useInitializer} from "../Providers/ProviderInitializer.tsx";
import FiltersLoader from "./Loader/FiltersLoader.tsx";

export default function Filters() {
    // global vars
    const {distinctCountries, distinctOwners, selCountries, setSelCountries, selOwners,
        setSelOwners} = useInitializer();
    const [isFetched, setIsFetched] = useState<boolean>(false);
    // toggles selected element
    const handleCheckbox = (value: string,
            handler:React.Dispatch<React.SetStateAction<Set<string>>>)=> {
        // leave if element is not found
        handler(prev => {
            const temp = new Set<string>(prev);
            if(temp.has(value)) temp.delete(value);
            else temp.add(value);
            return temp;
        })
    }
    // unchecks all elements from specified type
    const handleReset =
            (handler:React.Dispatch<React.SetStateAction<Set<string>>>) => {
        // disables all enabled element
        handler(new Set<string>());
    }

    return (
        <>
            {!isFetched ?
                <FiltersLoader setIsFetched={(val) => setIsFetched(val)}/>
            :
                <Box sx={{m:1.5}}>
                    <Accordion defaultExpanded sx={{m:1}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            Countries ({selCountries.size} Selected)
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display: "flex", flexDirection:"column"}}>
                                <Button
                                    onClick={() => handleReset(setSelCountries)}
                                    disabled={selCountries.size === 0}
                                    variant="outlined">Clear selection
                                </Button>
                                <Divider sx={{mt: 1, mb: 1}} orientation="horizontal"/>
                                {distinctCountries.size > 0 && [...distinctCountries.values()].map((i) => (
                                    <>
                                        <FormControlLabel
                                            control={
                                                <Checkbox
                                                    onChange={() => handleCheckbox(i, setSelCountries)}
                                                    checked={selCountries.has(i)}/>
                                            }
                                            label={i}
                                        />
                                        <Divider sx={{mt: 1, mb: 1}} orientation="horizontal"/>
                                    </>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion defaultExpanded sx={{m:1}}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
                            Owners ({selOwners.size} Selected)
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box sx={{display: "flex", flexDirection:"column"}}>
                                <Button
                                    variant="outlined"
                                    onClick={() => handleReset(setSelOwners)}
                                    disabled={selOwners.size === 0}
                                >Clear selection
                                </Button>
                                <Divider sx={{mt: 1, mb: 1}} orientation="horizontal"/>
                                {distinctOwners.size > 0 && [...distinctOwners.values()].map((i) => (
                                    <>
                                        <FormControlLabel
                                            control={<Checkbox
                                                onChange={() => handleCheckbox(i, setSelOwners)}
                                                checked={selOwners.has(i)}/>} label={i}
                                        />
                                        <Divider sx={{mt: 1, mb: 1}} orientation="horizontal"/>
                                    </>
                                ))}
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                </Box>
            }
        </>
    )
}