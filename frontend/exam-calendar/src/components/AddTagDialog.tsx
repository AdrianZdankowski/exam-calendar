import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, ThemeProvider } from "@mui/material";
import { useState } from "react";
import api from "../api/axios";
import TextFieldTheme from "../themes/TextFieldTheme";

interface AddTagDialogProps {
    open: boolean;
    toggleDialog: () => void;
    onTagAdded: () => void;
}

const AddTagDialog = ({open, toggleDialog, onTagAdded} : AddTagDialogProps) => {

    const TAG_NAME_REGEX = /^[a-zA-Z0-9._-]{2,40}$/;
    const TAG_NAME_ERROR_TEXT = "Tag name length must be within 2-40 alphanumeric and (-._) characters";
    const [nameError, setNameError] = useState<string>("");
    const [tagName,setTagName] = useState<string>("");
   
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNameError(TAG_NAME_REGEX.test(tagName) ? "" : TAG_NAME_ERROR_TEXT);
        if (nameError) return;
        else {
            try {
                await api.post('/tag', {name: tagName});
                setTagName("");
                toggleDialog();
                onTagAdded();
            }
            catch (error) {
                console.error(error);
            }
        }
    };

    return <>
    <Dialog
    open={open}
    onClose={toggleDialog}>
        <DialogTitle>
            Add new tag
        </DialogTitle>
        <DialogContent>
        {nameError ? <Alert variant="filled" severity="error" sx={{textWrap: "wrap"}}>{nameError}</Alert> : null}
        <form id="add-tag-form" onSubmit={handleSubmit}>
            <ThemeProvider theme={TextFieldTheme}>
                <TextField
                autoFocus
                required
                value={tagName}
                onChange={(e) => {setTagName(e.target.value); setNameError("");}}
                label="Tag name"
                id="tag-name"
                fullWidth
                variant="standard"
                />
            </ThemeProvider>
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