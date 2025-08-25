import { Box } from "@mui/material";
import { useState, useEffect } from "react";
import CalendarCard from "./CalendarCard";
import type { Task } from "../types/types";
import api from "../api/axios";

const Calendar = () => {

    const [tasks, setTasks] = useState<Task[]>([]);

    const currentDate = new Date().toISOString().slice(0,10);

    console.log("Rok: " + Number(currentDate.slice(0,4)) + " Miesiąc: " + Number(currentDate.slice(6,7)));
   
    const daysInMonth = (date: string): number => {
        return new Date(Number(date.slice(0,4)), Number(date.slice(5,7)), 0).getDate();
    };

    const firstDayOfMonth = new Date(Number(currentDate.slice(0,4)), Number(currentDate.slice(5,7))-1, 1).getDay();

    const startOffset = (firstDayOfMonth + 6) % 7;

    const totalDays = daysInMonth(currentDate);

    const calendarDays = [
        ...Array.from({length: startOffset}, () => null),
        ...Array.from({length: totalDays}, (_, i) => i + 1)
    ];

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    useEffect(() => {
        const getTasksByMonth = async () => {
            try {
                const response = await api.get<Task[]>('/task/date/2025/8');
                setTasks(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };

        getTasksByMonth();
    }, []);

    console.log(tasks);

    return<>
       <Box>
        <Box 
        sx=
        {{
            
            width: "100vw",
            display: "flex",
            flexDirection: {sm: "row", xs: "column"},
            gap: {sm: 2, xs: 1},

        }}
        >
            <Box
            sx={{
                display: "flex",
                flexDirection: "column"
            }}>
            <Box sx={{display: "grid", gridTemplateColumns: "repeat(7,1fr)"}}>
             {daysOfWeek.map((day) => (
                    <Box
                    key={day}
                    sx={{
                        textAlign: "center",
                        fontWeight: "bold",
                        color: "whitesmoke"
                    }}>
                        {day}
                    </Box>
                ))}
            </Box>    
            <Box 
            sx={{
                width: {sm: "70vw", xs: "100%"},
                height: "80vh",
                display: 'grid', 
                gridAutoRows: "1fr",
                backgroundColor: "#242c3a",
                gap: 1, 
                padding: 1, 
                margin: 0, 
                gridTemplateColumns: "repeat(7,1fr)",
                }}>
               
                {calendarDays.map((day, i) => {
                    if (!day) return <Box key={i} />;

                    const dayTasks = tasks.filter((task) => {
                        const taskDay = Number(task.taskDate.slice(8, 10));
                        return taskDay === day;
                    });

                    const taskCount = dayTasks.length;
                    const tags = dayTasks.flatMap((t) => t.tags);

                    return (
                        <CalendarCard
                        key={i}
                        dayNumber={day}
                        taskCount={taskCount}
                        tags={tags}
                        />
                    );
                    })};
            </Box>
            </Box>
            <Box
            sx={{
                backgroundColor: "green",
                borderRadius: "0.25rem",
                width: {xs: "100%",sm:"30%"},
                overflow: "hidden",
            }}>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nisl velit, malesuada ut tortor malesuada, ullamcorper laoreet eros. Duis fringilla fringilla lacinia. Praesent facilisis velit rutrum purus vestibulum euismod. In hac habitasse platea dictumst. Phasellus ultricies leo nisl. Suspendisse potenti. Integer eleifend leo nec suscipit tincidunt. Curabitur lacinia est et elementum consectetur. Quisque volutpat aliquam arcu, id venenatis lorem lobortis nec. Donec pellentesque tellus in rutrum venenatis. In hac habitasse platea dictumst. Ut ultrices, justo sed vestibulum venenatis, lectus dolor auctor augue, non finibus nibh est ac urna. Cras in tellus mauris. Pellentesque vel lorem eget metus vestibulum convallis ac quis odio.

Proin finibus non turpis sed consequat. Aliquam luctus, leo quis dictum pretium, nibh nibh tristique diam, nec laoreet orci dolor vel metus. Aliquam maximus ligula nibh, sed ultricies nibh porttitor at. Quisque tempor pharetra pharetra. Nulla pellentesque lorem at ullamcorper porta. Quisque ultrices ipsum in orci porta, sit amet pulvinar lorem fermentum. Mauris sit amet libero non ex porta pellentesque.

Duis posuere nisi justo. Suspendisse potenti. Praesent tincidunt sit amet quam eget iaculis. Fusce at mattis erat, a efficitur tellus. Nam aliquet vel urna ut mattis. Aliquam erat volutpat. Duis vel sapien eu mi tempor porta. Quisque imperdiet dui vitae eros porta, a posuere mauris aliquet. Nulla faucibus viverra metus eget interdum.

Integer fermentum velit at ex sodales, ut fringilla diam feugiat. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Sed aliquam cursus lectus, ut aliquam magna consequat eu. Mauris id ipsum sem. Aenean euismod ornare nisl sit amet varius. Curabitur eget ipsum in sem placerat ultricies. Maecenas semper sed erat in tempus.

In pretium arcu tellus, ut vehicula tortor rutrum id. Aenean vestibulum tellus id rhoncus lobortis. Morbi ut eleifend justo. Pellentesque finibus tincidunt sem, vitae consectetur augue dictum quis. Mauris id lacus mauris. Vivamus est velit, maximus eget sapien quis, tempor pretium arcu. Aliquam erat volutpat. Quisque enim nisi, consectetur ac justo vitae, scelerisque ullamcorper diam. Aliquam non lorem sit amet diam lacinia luctus.</p>
            </Box>
        </Box>
        </Box>
    </>
};

export default Calendar;