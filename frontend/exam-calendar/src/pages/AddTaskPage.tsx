import { Box, Button, Checkbox, Container, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select, TextareaAutosize, TextField, Typography, type SelectChangeEvent} from "@mui/material";
import { useState, useEffect } from "react";
import type { Tag } from "../types/types";
import api from "../api/axios";
import { useLocation } from "react-router-dom";

interface LocationState {
    currentDate?: string
}

const AddTaskPage = () => {

    const {state} = useLocation() as {state?: LocationState};

    const [selectedDate, setSelectedDate] = useState<string>(state?.currentDate || "");
    const [tags, setTags] = useState<Tag[]>([]);
    const [taskIds, setTaskIds] = useState<number[]>([]);
    const [taskTime, setTaskTime] = useState<string>("");
    const [taskDescription, setTaskDescription] = useState<string>("");

    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await api.get<Tag[]>("tag");
                setTags(response.data)
            }
            catch (error) {
                console.error("error");
            }
        };

        getTags();
    }, [])

    const handleSelectChange = (event: SelectChangeEvent<typeof taskIds>) => {
        const value = event.target.value;
        
        const ids = typeof value === "string" 
            ? value.split(",").map((v) => Number(v)) 
            : value.map((v) => Number(v));

        setTaskIds(ids);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Data: ${selectedDate}`);
        console.log(`Task time: ${taskTime}`);
        console.log(`Description: ${taskDescription}`);
        console.log(`Tags: ${taskIds}`);

        const payload = {
            taskDate: selectedDate,
            taskTime: taskTime || null,
            description: taskDescription,
            tagIds: taskIds
        };

        try {
            const response = await api.post('/task',payload);
            console.log(`Response: ${response.data}`);
        }
        catch (error) {
            console.error(error);
        }
    };

    return <Container maxWidth="sm" sx={{backgroundColor: "aqua", mt:4}}>
        <Paper elevation={8}>
            <Typography variant="h5" sx={{textAlign: "center"}}>Add new task</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",mt:2}}>
                <TextField 
                required 
                onChange={(e) => setSelectedDate(e.target.value)} 
                label="Task date" type="date" 
                value={selectedDate} 
                slotProps={{inputLabel: {shrink: true}}} 
                sx={{width: "10rem"}}/>
                <TextField 
                label="Task time" 
                type="time" 
                slotProps={{inputLabel: {shrink: true}}} 
                sx={{width: "10rem", mt: "1rem"}}
                onChange={(e) => setTaskTime(e.target.value)}/>
                <TextareaAutosize
                style={{width: "10rem", marginTop: "1rem"}} 
                minRows={3}
                placeholder="Task description"
                required
                onChange={(e) => setTaskDescription(e.target.value)}
                />
                <FormControl sx={{width:"10rem", mt: "1rem"}}>
                    <InputLabel id="tags-label">Tags</InputLabel>
                    <Select
                    labelId="tags-label"
                    multiple
                    value={taskIds}
                    input={<OutlinedInput label="Tag"/>}
                    renderValue={(selected) => 
                        tags.filter((tag) => selected.includes(tag.id))
                        .map((tag) => tag.name)
                        .join(", ")
                    }
                    onChange={handleSelectChange}
                    >
                        {tags.map((t) => (
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
                <Button type="submit" variant="contained" sx={{mt: "1rem", mb: "1rem"}}>
                        Submit
                </Button>
            </Box>
        </Paper>
        
    </Container>
}

export default AddTaskPage;