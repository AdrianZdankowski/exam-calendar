import { Alert, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import api from "../api/axios";

interface EditTagDialogProps {
    open: boolean;
    toggleDialog: () => void;
    onTagEdited: () => void;
    tagId?: number;
    ogTagName?: string;
}

const EditTagDialog = ({open, toggleDialog, tagId, ogTagName, onTagEdited} : EditTagDialogProps) => {

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
                await api.patch('/tag', {id: tagId ,name: tagName});
                setTagName("");
                toggleDialog();
                onTagEdited();
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
            Edit tag {ogTagName}
        </DialogTitle>
        <DialogContent>
        {nameError ? <Alert variant="filled" severity="error" sx={{textWrap: "wrap"}}>{nameError}</Alert> : null}
        <form id="edit-tag-form" onSubmit={handleSubmit}>
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
        </form>
        <DialogActions>
            <Button variant="contained" onClick={toggleDialog}>Cancel</Button>
            <Button variant="contained" type="submit" form="edit-tag-form">Edit</Button>
        </DialogActions>
        </DialogContent>
    </Dialog>
    </>
}

export default EditTagDialog;