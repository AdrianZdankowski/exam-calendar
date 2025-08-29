import { Box, Container, Paper, TextField, Typography} from "@mui/material";
import { useState } from "react";


const AddTaskPage = () => {

    const [selectedDate, setSelectedDate] = useState<string>("2025-08-29");

    return <Container maxWidth="sm" sx={{backgroundColor: "aqua", mt:4}}>
        <Paper elevation={8}>
            <Typography variant="h5" sx={{textAlign: "center"}}>Add new task</Typography>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",mt:2}}>
                <TextField required onChange={(e) => {setSelectedDate(e.target.value); console.log(e.target.value)}} label="Task date" type="date" value={selectedDate} slotProps={{inputLabel: {shrink: true}}} sx={{width: "10rem"}}/>
                <TextField label="Task time" type="time" slotProps={{inputLabel: {shrink: true}}} sx={{width: "10rem", mt:2}}/>
            </Box>
        </Paper>
        
    </Container>
}

export default AddTaskPage;