import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Tag } from "../types/types";
import api from "../api/axios";
import { Button, Container, IconButton, Paper } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddTagDialog from "../components/AddTagDialog";

const TagsPage = () => {

    const [open, setOpen] = useState<boolean>(false);

    const toggleDialog = () => setOpen(prev => !prev);

    const handleEdit = (id: number) => {
        console.log("Edit tag ", id);
    }

    const handleDelete = (id: number) => {
        console.log("Delete tag ", id);
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
                onClick={() => handleEdit(params.row.id)}>
                    <EditIcon/>
                </IconButton>
                <IconButton
                color="error"
                onClick={() => handleDelete(params.row.id)}>
                    <DeleteIcon/>
                </IconButton>
                </>
            }
        }
    ];

    useEffect(() => {
        const getTags = async () => {
            try {
                const response = await api.get<Tag[]>("tag");
                setTags(response.data)
            }
            catch (error) {
                console.error("error");
            }
        };

        getTags();
    }, [])

    return <>
    <Container maxWidth="sm">
    <h1>Tags</h1>
    <AddTagDialog open={open} toggleDialog={toggleDialog}/>
    <Paper>
        <Button variant="contained" sx={{margin: 1}} onClick={toggleDialog}>Add tag</Button>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5,10,20]}/>
    </Paper>
    </Container>
    </>
};

export default TagsPage