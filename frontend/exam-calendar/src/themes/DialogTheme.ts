import { createTheme} from "@mui/material";

const DialogTheme = createTheme({
    components: {
        MuiDialog: {
            defaultProps: {
                slotProps: {
                    paper: {
                        sx: {
                            backgroundColor: "#242c3a",
                            color: "whitesmoke"
                        }
                    }
                }
            }
        }
    }
});

export default DialogTheme;