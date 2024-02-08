import { createTheme } from "@mui/material/styles";
import parser from 'ua-parser-js';
import mediaQuery from 'css-mediaquery';


// const ssrMatchMedia = (deviceType: string) => (query: string) => ({
//   matches: mediaQuery.match(query, {
//     width: deviceType === 'mobile' ? '0px' : '1024px',
//   })
// })


export const mainTheme = (deviceType: string) => createTheme({
  palette: {
    primary: {
      main:  '#08AD2C'
    },
  },
  typography: {
    fontFamily:  'Ropa Sans',
    
  },
  components:{
    MuiUseMediaQuery: {
      defaultProps: {
        ssrMatchMedia: (query) => ({
          matches: mediaQuery.match(query, {
            // The estimated CSS width of the browser.
            width: deviceType === 'desktop' ? '1900px' : '900px', // Add this default prop
          }),
        }),
      }
    },
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
    },
    MuiCheckbox:{
      styleOverrides:{
        root:{
          color: "#ffff",
        }
      }
    },
    MuiDivider:{
      styleOverrides:{
        root:{
          borderColor: "#ffffff38",
        }
      }
    }
  }
});
