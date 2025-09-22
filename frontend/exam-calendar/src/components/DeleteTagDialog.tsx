import { Button, Dialog, DialogActions,DialogTitle } from "@mui/material";
import api from "../api/axios";

interface DeleteTagDialogProps {
    open: boolean;
    toggleDialog: () => void;
    tagId?: number;
    tagName?: string;
    onTagDeleted: () => void;
}

const DeleteTagDialog = ({open, toggleDialog, tagId, tagName, onTagDeleted} : DeleteTagDialogProps) => {

    const deleteTag = async () => {
        try {
            api.delete(`/tag/${tagId}`);
            toggleDialog();
            onTagDeleted();
        } 
        catch (error) {
            console.error(error);
        }
    }

    return <>
    <Dialog
    open={open}
    onClose={toggleDialog}>
        <DialogTitle>
            {`Permamently delete tag ${tagName} with id ${tagId}?`}
        </DialogTitle>
        <DialogActions>
            <Button variant="contained" onClick={toggleDialog}>No</Button>
            <Button variant="contained" color="error" onClick={deleteTag}>Yes</Button>
        </DialogActions>
    </Dialog>
    </>
}

export default DeleteTagDialog;