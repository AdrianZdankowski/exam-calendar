import { createTheme } from "@mui/material";

const TextFieldTheme = createTheme({
    components: {
    MuiTextField: {
      defaultProps: {
        slotProps: {
          input: {
            sx: {
              color: "whitesmoke",
            },
          },
          root: {
            sx: {
              "&:before": { borderBottomColor: "whitesmoke" },
              "&:after": { borderBottomColor: "whitesmoke" },
              "&:hover:not(.Mui-disabled):before": {
                borderBottomColor: "whitesmoke",
              }
            }
          },
          inputLabel: {
            sx: {
              color: "whitesmoke",
              "&.Mui-focused": { color: "whitesmoke" },
            }
          }
        }
      }
    }
  }
});

export default TextFieldTheme;