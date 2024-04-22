import mediaQuery from "css-mediaquery";

import { createTheme } from "@mui/material/styles";
import { BorderBottom } from "@mui/icons-material";

// const ssrMatchMedia = (deviceType: string) => (query: string) => ({
//   matches: mediaQuery.match(query, {
//     width: deviceType === 'mobile' ? '0px' : '1024px',
//   })
// })

export const mainTheme = (deviceType: string) =>
  createTheme({
    palette: {
      primary: {
        main: "#08AD2C",
      },
      info: {
        main: "#fff",
      },
      
    },
    typography: {
      fontFamily: "Ropa Sans",
    },
    components: {
      MuiUseMediaQuery: {
        defaultProps: {
          ssrMatchMedia: (query) => ({
            matches: mediaQuery.match(query, {
              // The estimated CSS width of the browser.
              width: deviceType === "desktop" ? "1900px" : "900px", // Add this default prop
            }),
          }),
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-input": {
              color: "#fff",
              border: "2.4px #fff solid",
              borderTop: "none",
              borderLeft: "none",
              borderRight: "none",
              paddingBottom: "2px",
              paddingTop: "4.2px",
            },
            "& .MuiInputBase-inputMultiline": {
              color: "#fff",
              border: "none",
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

        },
      },

      MuiFormLabel: {
        styleOverrides: {
          root: {
            color: "#fff",
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            color: "#ffff",
            fontSize: "10px",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            width: "100px",
            color: "#ffff",
            background: "#08AD2C",
            "&:hover": {
              background: "#08AD2C",
            },
            "&.Mui-disabled": {
              background: "none",
              color: "#ffff",
              border: "#08AD2C 1px solid",
            },
          },
        },
        variants: [
          {
            props: {
              color: "error",
            },
            style: {
              width: "100px",
              color: "#ffff",
              background: "#CD5644",
              "&:hover": {
                background: "#CD5644",
              },
            },
          },
        ],
      },
      MuiChip: {
        styleOverrides: {
          root: {
            color: "#ffff",
            background: "none",
            border: "#08AD2C 1px solid",
            borderRadius: "5px",
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            color: "#ffff",
            background: "none",
            borderRadius: "5px",
            "&.Mui-selected": {
              color: "#ffff",
            },
            "&.Mui-indicator": {
              background: "#08AD2C",
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: "#ffff",
            "&.Mui-disabled": {
              color: "#ffffff38",
            },
            "&.Mui-disabled span": {
              color: "#ffffff38",
            },
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          root: {
            color: "#ffff",
            "&.Mui-disabled span": {
              color: "#ffffff5e !important",
            },
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          root: {
            "& div.MuiPaper-root": {
              background: "#000",
              color: "#ffff",
              borderRadius: "0px 0px 10px 5px",
              boxShadow: "0 5px 15px rgba(8,173,44,0.2 )",
            },
          },
        },
      },
      MuiRadio: {
        styleOverrides: {
          root: {
            color: "#ffff",
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: "#ffffff38",
          },
        },
      },
    },
  });
