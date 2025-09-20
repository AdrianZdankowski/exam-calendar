import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import type { Tag } from "../types/types";
import api from "../api/axios";
import { Container, Paper } from "@mui/material";

const TagsPage = () => {

    const [tags, setTags] = useState<Tag[]>([]);
    const rows: Tag[] = tags;
    const columns: GridColDef[] = [
        {field: "id", headerName: "ID"},
        {field: "name", headerName: "Name"}
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
    <Paper>
        <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5,10,20]}/>
    </Paper>
    </Container>
    </>
};

export default TagsPage