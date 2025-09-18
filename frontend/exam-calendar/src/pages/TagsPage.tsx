import { useEffect, useState } from "react";
import type { Tag } from "../types/types";
import api from "../api/axios";

const TagsPage = () => {

    const [tags, setTags] = useState<Tag[]>([]);

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
    <h1>Tags</h1>
    <ul>
        {tags.map(tag => (
            <li key={tag.id}>
                <p>{tag.name}</p>
            </li>
        ))}
    </ul>
    </>
};

export default TagsPage