import {Box, CircularProgress, Typography} from "@mui/material";

export default function BaseLoader({label}:{label:string}) {
    return (
        <Box sx={{display: "flex", flexDirection: "column", height: "100%", gap: 1,
            width: "100%", justifyContent: "center", alignItems: "center"}}>
            <CircularProgress/>
            <Typography>{label}</Typography>
        </Box>
    )
}