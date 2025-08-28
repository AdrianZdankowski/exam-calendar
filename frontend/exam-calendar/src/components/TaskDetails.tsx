import { Typography, Divider, Box, Tooltip, Chip } from "@mui/material";
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DescriptionIcon from '@mui/icons-material/Description';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import type { Task } from "../types/types";


interface TaskDetailsProps {
    date: string;
    tasks: Task[];
}

const TaskDetails = ({date, tasks} : TaskDetailsProps) => {
    return<>
    <Typography variant="h5" sx={{color: "whitesmoke", ml: 1, mt: 1, mb:1}}>{`Tasks for ${date}`}</Typography>
    <Divider sx={{borderBlockColor: "whitesmoke"}}/>
    {/* {tasks.map((task) => (
        <div key={task.id}>
            <p>{task.taskTime}</p>
            <p>{task.description}</p>
            <div>Tagi: {task.tags.map((t) => t.name).join(", ")}</div>
        </div>
    ))} */}
    {tasks.map((task) => (
        <Box key={task.id} sx={{color:"whitesmoke", mt:2}}>
            <Box sx={{display: "flex", gap: 1, ml: 1}}>
                <Tooltip title="Task time" arrow>
                    <AccessTimeIcon/>
                </Tooltip>
                <Typography>{task.taskTime ? task.taskTime.slice(0,5) : "--:--"}</Typography>
            </Box>
            <Box sx={{ml: 1, mt: 1}}>
                <Tooltip title="Task description" arrow>
                    <DescriptionIcon/>
                </Tooltip>
                <Typography>{task.description}</Typography>
            </Box>
            <Box sx={{ml: 1, mt: 1}}>
                <Tooltip title="Task tags" arrow>
                    <LabelOutlinedIcon/>
                </Tooltip>
                <Box sx={{display: "flex", gap: 1, mb: 2}}>
                    {task.tags.map((t, index) => (
                        <Chip key={`${t.name}${t.id -index}`} size="small" label={t.name} sx={{color: "whitesmoke", backgroundColor: "gray"}}/>
                    ))}
                    
                </Box>
                <Divider sx={{borderBlockColor: "whitesmoke"}}/>
            </Box>
        </Box>
    ))}
    
    </>
};

export default TaskDetails;