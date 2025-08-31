import { Box, Button, Checkbox, Container, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select, TextareaAutosize, TextField, Typography, type SelectChangeEvent} from "@mui/material";
import { useState } from "react";


const AddTaskPage = () => {

    const [selectedDate, setSelectedDate] = useState<string>("2025-08-29");
    const [taskIds, setTaskIds] = useState<number[]>([]);
    let taskTime: string = "";
    let taskDescription: string = "";

    const handleSelectChange = (event: SelectChangeEvent<typeof taskIds>) => {
        const value = event.target.value;
        
        const ids = typeof value === "string" 
            ? value.split(",").map((v) => Number(v)) 
            : value.map((v) => Number(v));

        setTaskIds(ids);
        console.log(ids); 
    };

    const sampleTags = [
        {
            "id": 1,
            "name": "WORK"
        },
        {
            "id": 2,
            "name": "PRIVATE"
        }
    ]

    return <Container maxWidth="sm" sx={{backgroundColor: "aqua", mt:4}}>
        <Paper elevation={8}>
            <Typography variant="h5" sx={{textAlign: "center"}}>Add new task</Typography>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",mt:2}}>
                <TextField 
                required 
                onChange={(e) => {setSelectedDate(e.target.value); console.log(e.target.value)}} 
                label="Task date" type="date" 
                value={selectedDate} 
                slotProps={{inputLabel: {shrink: true}}} 
                sx={{width: "10rem"}}/>
                <TextField 
                label="Task time" 
                type="time" 
                slotProps={{inputLabel: {shrink: true}}} 
                sx={{width: "10rem", mt: "1rem"}}
                onChange={(e) => {taskTime=e.target.value; console.log(taskTime)}}/>
                <TextareaAutosize
                style={{width: "10rem", marginTop: "1rem"}} 
                minRows={3}
                placeholder="Task description"
                required
                onChange={(e) => {taskDescription=e.target.value; console.log(taskDescription)}}
                />
                <FormControl sx={{width:"10rem", mt: "1rem"}}>
                    <InputLabel id="tags-label">Tags</InputLabel>
                    <Select
                    labelId="tags-label"
                    multiple
                    value={taskIds}
                    input={<OutlinedInput label="Tag"/>}
                    renderValue={(selected) => 
                        sampleTags.filter((tag) => selected.includes(tag.id))
                        .map((tag) => tag.name)
                        .join(", ")
                    }
                    onChange={handleSelectChange}
                    >
                        {sampleTags.map((t) => (
                            <MenuItem
                            key={t.id}
                            value={t.id}
                            >
                                <Checkbox checked={taskIds.includes(t.id)}/>
                                <ListItemText primary={t.name}/>
                            </MenuItem>
                        ))}
                        
                    </Select>
                </FormControl>
                <Button variant="contained" sx={{mt: "1rem", mb: "1rem"}}>
                        Submit
                </Button>
            </Box>
        </Paper>
        
    </Container>
}

export default AddTaskPage;