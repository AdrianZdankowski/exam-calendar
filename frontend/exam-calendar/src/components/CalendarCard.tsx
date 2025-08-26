import { Card, Typography, Box, Chip } from "@mui/material";
import type { Tag } from "../types/types";

interface CalendarCardProps {
    dayNumber: number;
    taskCount?: number;
    tags?: Tag[];
}

const CalendarCard = ({dayNumber, taskCount, tags} : CalendarCardProps) => {
    return (
        <Card 
        sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            height: "100%", 
            width: "100%",
            padding: 0.5, 
            margin: 0, 
            backgroundColor: "#2d3748", 
            color: "whitesmoke",
            cursor: "pointer",
            }}>
                <Typography>{dayNumber}</Typography>
                {!!taskCount ? <Chip size="small" label={taskCount} sx={{color: "whitesmoke"}}/> : null}
                
                <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexFlow: "wrap",
                    gap: "0.25rem",
                    mb: "0.25rem"
                }}>
                   {tags?.length ? (
                    tags.map((tag) => (
                        <Chip
                            key={tag.id}
                            size="small"
                            label={tag.name}
                            sx={{color: "whitesmoke"}}
                        />
                    ))
                   ): null}
                </Box>
        </Card>
    )
}

export default CalendarCard;