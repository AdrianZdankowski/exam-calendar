import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Tag } from "../types/types";
import api from "../api/axios";
import { Button, Container, IconButton, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTagDialog from "../components/AddTagDialog";
import DeleteTagDialog from "../components/DeleteTagDialog";

const TagsPage = () => {
    const [openAddTagDialog, setOpenTagDialog] = useState<boolean>(false);
    const [openDeleteTagDialog, setOpenDeleteTagDialog] = useState<boolean>(false);

    const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

    const toggleAddTagDialog = () => setOpenTagDialog(prev => !prev);
    const toggleDeleteTagDialog = () => setOpenDeleteTagDialog(prev => !prev);

    const handleEdit = (id: number) => {
        console.log("Edit tag ", id);
    }

    const handleDelete = (tag: Tag) => {
        setSelectedTag(tag);
        toggleDeleteTagDialog();
    }

    const [tags, setTags] = useState<Tag[]>([]);
    const rows: Tag[] = tags;
    const columns: GridColDef[] = [
        {field: "id", headerName: "ID"},
        {field: "name", headerName: "Name"},
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            filterable: false,
            renderCell: (params) => {
                if (params.row.id === 1 || params.row.id === 2) return null;

                return <>
                <IconButton
                color="primary"
                onClick={() => handleEdit(params.row)}>
                    <EditIcon/>
                </IconButton>
                <IconButton
                color="error"
                onClick={() => handleDelete(params.row)}>
                    <DeleteIcon/>
                </IconButton>
                </>
            }
        }
    ];

     const getTags = async () => {
        try {
            const response = await api.get<Tag[]>("tag");
            setTags(response.data)
        }
        catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTags();
    }, []);

    return <>
    <Container maxWidth="sm">
    <h1>Tags</h1>
    <AddTagDialog open={openAddTagDialog} toggleDialog={toggleAddTagDialog} onTagAdded={getTags}/>
    <DeleteTagDialog open={openDeleteTagDialog} toggleDialog={toggleDeleteTagDialog} tagId={selectedTag?.id} tagName={selectedTag?.name} onTagDeleted={getTags}/>
    <Paper>
        <Button variant="contained" sx={{margin: 1}} onClick={toggleAddTagDialog}>Add tag</Button>
        <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
            pagination: {
                paginationModel: {pageSize: 5, page: 0}
            }
        }}/>
    </Paper>
    </Container>
    </>
};

export default TagsPage