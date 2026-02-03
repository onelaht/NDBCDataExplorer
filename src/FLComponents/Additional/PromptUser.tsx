import {Box, Typography} from "@mui/material";
import ReportProblemIcon from '@mui/icons-material/ReportProblem';

export default function PromptUser({label}:{label:string}) {
    return (
        <Box sx={{display: "flex", flexDirection: "column", height: "100%", gap: 1,
            width: "100%", justifyContent: "center", alignItems: "center"}}>
            <ReportProblemIcon/>
            <Typography>{label}</Typography>
        </Box>
    )
}