import { Typography, Divider } from "@mui/material";
import type { Task } from "../types/types";


interface TaskDetailsProps {
    date: string;
    tasks: Task[];
}

const TaskDetails = ({date, tasks} : TaskDetailsProps) => {
    return<>
    <Typography variant="h5">{`Tasks for ${date}`}</Typography>
    <Divider/>
    {tasks.map((task) => (
        <div key={task.id}>
            <p>{task.taskTime}</p>
            <p>{task.description}</p>
            <div>Tagi: {task.tags.map((t) => t.name).join(", ")}</div>
        </div>
    ))}
    </>
};

export default TaskDetails;