import { Card, Typography, Divider, Box, Chip } from "@mui/material";

const handleClick = () => {
    console.log("Card clicked")
}

const CalendarCard = () => {
    return (
        <Card onClick={handleClick}sx={{height: "100%", padding: 0, margin: 0, backgroundColor: "#8395a7", color: "whitesmoke"}}>
            <Box mb={1} sx={{backgroundColor: "#576574"}}>
                <Typography variant="h5" sx={{paddingLeft: "0.5rem"}}>22</Typography>
                <Divider/>
            </Box>
            <Typography variant="h6" sx={{paddingLeft: "0.5rem"}}>
                3 Tasks
            </Typography>
            <Divider/>
            <Box
                sx={{
                    display: "flex", 
                    alignContent: "center",
                    justifyContent: "center",
                    flexWrap: "wrap", 
                    padding: 1, 
                    gap: 1
                }}>
                <Chip size="small" label="WORK" sx={{color: "whitesmoke"}}/>
                <Chip size="small" label="PRIVATE" sx={{color: "whitesmoke"}}/>
                <Chip size="small" label="UNIVERSITY" sx={{color: "whitesmoke"}}/>
            </Box>
        </Card>
    )
}

export default CalendarCard;