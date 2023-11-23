import { createTheme } from "@mui/material/styles";

export const mainTheme = createTheme({
  palette: {
    primary: {
      main:  '#08AD2C'
    },
  },
  typography: {
    fontFamily:  'Ropa Sans',
    
  },
  components:{
    MuiTextField:{
      styleOverrides:{
        root: {
          "& .MuiInputBase-input": {
            color: "#fff",
            border: "2.4px #fff solid",
            borderTop: "none",
            borderLeft: "none",
            borderRight: "none",
            paddingBottom:"2px",
            paddingTop:"4.2px"
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
          },
        },
      }
    },
    MuiButton:{
      styleOverrides:{
        root:{
          width:"100px",
          color: "#ffff",
          background:"#08AD2C",
          "&:hover":{
            background:"#08AD2C",
          }
        }
      }
    },
    MuiChip: {
      styleOverrides:{
        root:{
          color: "#ffff",
          background:"none",
          border:"#08AD2C 1px solid",
          borderRadius:"5px"
        }
      }
    },
    MuiTab: {
      styleOverrides:{
        root:{
          color: "#ffff",
          background:"none",
          borderRadius:"5px",
          "&.Mui-selected":{
            color: "#ffff",
            
          },
          "&.Mui-indicator":{
            background:"#08AD2C",
            
          }
        }
      }
    }
  }
});
