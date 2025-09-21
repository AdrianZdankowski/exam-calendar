import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";

interface AddTagDialogProps {
    open: boolean;
    toggleDialog: () => void;
}

const AddTagDialog = ({open, toggleDialog} : AddTagDialogProps) => {

    const [tagName,setTagName] = useState<string>("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Given tag name: ${tagName}`);
        
    };

    return <>
    <Dialog
    open={open}
    onClose={toggleDialog}>
        <DialogTitle>
            Add new tag
        </DialogTitle>
        <DialogContent>
        <form id="add-tag-form" onSubmit={handleSubmit}>
            <TextField
            autoFocus
            required
            value={tagName}
            onChange={(e) => setTagName(e.target.value)}
            label="Tag name"
            id="tag-name"
            fullWidth
            variant="standard"
            />
        </form>
        <DialogActions>
            <Button variant="contained" onClick={toggleDialog}>Cancel</Button>
            <Button variant="contained" type="submit" form="add-tag-form">Add</Button>
        </DialogActions>
        </DialogContent>
    </Dialog>
    </>
}

export default AddTagDialog;