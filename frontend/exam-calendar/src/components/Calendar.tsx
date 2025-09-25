import { Box, Select, MenuItem, FormControl } from "@mui/material";
import { useState, useEffect } from "react";
import CalendarCard from "./CalendarCard";
import type { Task } from "../types/types";
import api from "../api/axios";
import TaskDetails from "./TaskDetails";
import type { AxiosError } from "axios";
import { ThemeProvider } from "@mui/material/styles";
import SelectMenuTheme from "../themes/SelectMenuTheme";

interface TasksByDay {
    [day: string]: Task[];
}

const Calendar = () => {

    const today = new Date();
    const currentYear = today.getFullYear();
    
    const [tasks, setTasks] = useState<TasksByDay>({});
    const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
    const [selectedDate, setSelectedDate] = useState<string>(today.toISOString().slice(0, 10));
    
    const monthNames = [
        "January", "February", "March",
        "April", "May", "June",
        "July", "August", "September",
        "October", "November", "December"];

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const daysInMonth = (year: number, month: number): number => {
        return new Date(year, month + 1, 0).getDate();
    };

    const firstDayOfMonth = new Date(currentYear, selectedMonth, 1).getDay();

    const startOffset = (firstDayOfMonth + 6) % 7;

    const totalDays = daysInMonth(currentYear, selectedMonth);

    const calendarDays = [
        ...Array.from({ length: startOffset }, () => null),
        ...Array.from({ length: totalDays }, (_, i) => i + 1)
    ];

    useEffect(() => {
        const getTasksByMonth = async () => {
            try {
                const response = await api.get<Task[]>(`/task/date/${currentYear}/${selectedMonth + 1}`);

                const groupedByDay: TasksByDay = {};
                response.data.forEach(task => {
                    const day = task.taskDate.slice(8, 10);
                    if (!groupedByDay[day]) groupedByDay[day] = [];
                    groupedByDay[day].push(task);
                });

                setTasks(groupedByDay);
            }
            catch (error) {
                if ((error as AxiosError).response?.status === 400) {
                    console.log(`No tasks for ${monthNames[selectedMonth]}`);
                }
                else console.error(error);
                setTasks({});
            }
        };

        getTasksByMonth();
    }, [selectedMonth]);

    const handleCalendarCardClick = (day: number) => {
        setSelectedDate(new Date(currentYear, selectedMonth, day + 1).toISOString().slice(0, 10));
    };

    const removeTask = (day: number, taskId: number) => {
        setTasks(prev => {
            const updated = {...prev};
            updated[day] = updated[day].filter(task => task.id !== taskId);

            if (updated[day].length === 0) delete updated[day];
            return updated;
        });
    };

    return <>
        
            <Box
                sx=
                {{
                    width: "100vw",
                    display: "flex",
                    flexDirection: { sm: "row", xs: "column" },
                    gap: { sm: 2, xs: 1 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column"
                    }}>
                    <FormControl sx={{ display: "flex", placeItems: "center" }}>
                        <ThemeProvider theme={SelectMenuTheme}>
                        <Select
                            sx={{ width: "10rem", color: "whitesmoke", backgroundColor: "#2d3748"}}
                            value={Number(selectedMonth)}
                            onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                            {monthNames.map((m, i) => (
                                <MenuItem key={i} value={i}>{m}</MenuItem>
                            ))}
                        </Select>
                        </ThemeProvider>
                    </FormControl>
                    <Box sx={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)" }}>
                        {daysOfWeek.map((day) => (
                            <Box
                                key={day}
                                sx={{
                                    textAlign: "center",
                                    fontFamily: "Roboto",
                                    fontWeight: "bold",
                                    color: "whitesmoke"
                                }}>
                                {day}
                            </Box>
                        ))}
                    </Box>
                    <Box
                        sx={{
                            width: { sm: "70vw", xs: "100%" },
                            height: "100%",
                            display: 'grid',
                            gridAutoRows: "1fr",
                            backgroundColor: "#242c3a",
                            gap: 1,
                            padding: 1,
                            margin: 0,
                            gridTemplateColumns: "repeat(7,1fr)",
                        }}>

                        {calendarDays.map((day, i) => {
                            if (!day) return <Box key={i} />

                            const dayTasks = tasks[day] || [];
                            const taskCount = dayTasks.length;
                            const tags = dayTasks.flatMap((t) => t.tags);

                            return (
                                <CalendarCard
                                    key={i}
                                    dayNumber={day}
                                    taskCount={taskCount}
                                    tags={tags}
                                    onSelectDay={handleCalendarCardClick}
                                />
                            );
                        })}
                    </Box>
                </Box>
                <Box
                    sx={{
                        height: "90vh",
                        backgroundColor: "#242c3a",
                        borderRadius: "0.25rem",
                        width: { xs: "100%", sm: "30%" },
                        overflowY: "auto",
                        overflowX: "hidden"
                    }}>
                    <TaskDetails onRemoveTask={removeTask} date={selectedDate} tasks={tasks[selectedDate.slice(-2)] ?? []} />
                </Box>
            </Box>
        
    </>
};

export default Calendar;