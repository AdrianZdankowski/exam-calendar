import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useState } from "react";
import api from "../api/axios";

interface DeleteDialogProps {
    taskId:number;
    date: string;
    onRemoveTask: (day: number, taskId: number) => void;
};


const DeleteTaskDialog = ({taskId, date, onRemoveTask} : DeleteDialogProps) => {

    const [open,setOpen] = useState<boolean>(false);

    const toggleDialog = () => setOpen(prev => !prev);

    const handleDeleteClick = () => {
        handleDeletion();
        setOpen(false);
    };

    const handleDeletion = async () => {
        try {
            const response = await api.delete(`/task/${taskId}`);
            console.log(response.data);
            onRemoveTask(Number(date.slice(-2)), taskId);
        }
        catch (error) {
            console.error(error);
        }
    }

    return <>
    <Button variant="contained" sx={{mb: "1rem"}} onClick={toggleDialog}>Delete</Button>
    <Dialog
        open={open}
        onClose={toggleDialog}
    >
        <DialogTitle>
            Delete task with id: {taskId}?
        </DialogTitle>
        <DialogContent>
            The task with id {taskId} will be permamently deleted.
        </DialogContent>
        <DialogActions>
            <Button variant="contained" sx={{backgroundColor: "green"}}onClick={toggleDialog} autoFocus>No</Button>
            <Button variant="contained" sx={{backgroundColor: "red"}}onClick={handleDeleteClick}>Yes</Button>
        </DialogActions>
    </Dialog>
    </>
};

export default DeleteTaskDialog;