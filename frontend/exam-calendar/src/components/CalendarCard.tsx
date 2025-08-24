import { Card, Typography, Box, Chip } from "@mui/material";

interface CalendarCardProps {
    dayNumber: number;
}

const handleClick = () => {
    console.log("Card clicked")
}



const CalendarCard = ({dayNumber} : CalendarCardProps) => {
    return (
        <Card onClick={handleClick} 
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%", 
            width: "100%",
            padding: 0.5, 
            margin: 0, 
            backgroundColor: "#8395a7", 
            color: "whitesmoke",
            cursor: "pointer",
            }}>
                <Typography>{dayNumber}</Typography>
                <Chip size="small" label="3" sx={{color: "whitesmoke"}}/>
                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexFlow: "wrap",
                    gap: "0.25rem",
                    mb: "0.25rem"
                }}>
                <Chip size="small" label="WORK" sx={{color: "whitesmoke"}}/>
                <Chip size="small" label="PRIVATE" sx={{color: "whitesmoke"}}/>
                <Chip size="small" label="UNIVERSITY" sx={{color: "whitesmoke"}}/>
               
                </Box>
        </Card>
    )
}

export default CalendarCard;