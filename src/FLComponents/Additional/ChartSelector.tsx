import {Box, FormControl, MenuItem, Select, Typography, InputLabel, type SelectChangeEvent} from "@mui/material";
import React, {useCallback, useState} from "react";
import ChartTypeSelector from "../Loader/ChartTypeSelector.tsx";

export default function ChartSelector({setDatatype, setIsSelected}:
    {setDatatype: React.Dispatch<React.SetStateAction<string>>,
     setIsSelected: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [selected, setSelected] = useState<string>("");
    const [isFetched, setIsFetched] = useState<boolean>(false);
    const [datatypes, setDatatypes] = useState<string[]>([]);

    const handleChange = useCallback((event:SelectChangeEvent<unknown>) => {
        setDatatype(event.target.value as string);
        setSelected(event.target.value as string);
        setIsSelected(true);
    }, [setDatatype, setIsSelected])

    return (
        <>
            {!isFetched ?
                <ChartTypeSelector setDatatype={(val) => setDatatypes(val)}
                                   setIsFetched={(val) => setIsFetched(val)}/>
            :
                <Box sx={{display: "flex", flexDirection: "column", height: "100%", gap: 1,
                    width: "100%", justifyContent: "center", alignItems: "center"}}>
                    <Typography>Select available datatype</Typography>
                    <FormControl sx={{width: "10rem"}}>
                        <InputLabel id="label">Datatype</InputLabel>
                        <Select
                            label={"Datatype"}
                            value={selected}
                            onChange={handleChange}>
                            {datatypes.map((i) => (
                                <MenuItem key={i} value={i}>{i}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            }
        </>
    )
}