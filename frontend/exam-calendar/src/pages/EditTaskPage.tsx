import { useLocation, useNavigate, Navigate } from "react-router-dom";
import type { Tag, Task } from "../types/types";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { Box, Button, Checkbox, Container, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select, TextareaAutosize, TextField, Typography, type SelectChangeEvent } from "@mui/material";

interface LocationState {
    task: Task;
}

const EditTaskPage = () => {

    const {state} = useLocation() as {state?: LocationState};

    if (!state?.task) {
        return <Navigate to="/" replace/>
    }

    const navigate = useNavigate();

    const [selectedDate, setSelectedDate] = useState<string>(state?.task.taskDate ?? "");
    const [tags, setTags] = useState<Tag[]>(state?.task.tags ?? []);
    const [tagIds, setTagIds] = useState<number[]>(state?.task.tags.map(t => t.id) ?? []);
    const [taskTime, setTaskTime] = useState<string>(state?.task.taskTime ?? "");
    const [taskDescription, setTaskDescription] = useState<string>(state?.task.description ?? "");

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

    const handleSelectChange = (event: SelectChangeEvent<typeof tagIds>) => {
            const value = event.target.value;
            
            const ids = typeof value === "string" 
                ? value.split(",").map((v) => Number(v)) 
                : value.map((v) => Number(v));
    
            setTagIds(ids);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Data: ${selectedDate}`);
        console.log(`Task time: ${taskTime}`);
        console.log(`Description: ${taskDescription}`);
        console.log(`Tags: ${tagIds}`);

         const payload = {
            taskDate: selectedDate,
            taskTime: taskTime || null,
            description: taskDescription,
            tagIds: tagIds
        };

        try {
            await api.put(`/task/${state?.task.id}`,payload);
            navigate('/', {
            replace: true
            })
        }
        catch (error) {
            console.error(error);
        }
    };
    

    console.log(state?.task);
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
                value={taskTime} 
                slotProps={{inputLabel: {shrink: true}}} 
                sx={{width: "10rem", mt: "1rem"}}
                onChange={(e) => setTaskTime(e.target.value)}/>
                <TextareaAutosize
                style={{width: "10rem", marginTop: "1rem"}} 
                minRows={3}
                placeholder="Task description"
                required
                onChange={(e) => setTaskDescription(e.target.value)}
                value={taskDescription}
                />
                <FormControl sx={{width:"10rem", mt: "1rem"}}>
                    <InputLabel id="tags-label">Tags</InputLabel>
                    <Select
                    labelId="tags-label"
                    multiple
                    value={tagIds}
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
                                <Checkbox checked={tagIds.includes(t.id)}/>
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

export default EditTaskPage;