import { createTheme } from "@mui/material/styles";

const SelectMenuTheme = createTheme({
  components: {
    MuiMenu: {
        defaultProps: {
            slotProps: {
                paper: {
                    sx: {
                        backgroundColor: "#1a202c",
                        color: "whitesmoke",
                    }
                }
            }
        }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&:hover": {
            backgroundColor: "#2d3748",
          },
          "&.Mui-selected": {
            backgroundColor: "#4a5568",
          }
        }
      }
    }
  }
});


export default SelectMenuTheme;