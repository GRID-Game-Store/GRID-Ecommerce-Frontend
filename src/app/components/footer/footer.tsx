import { Typography } from "@mui/material";


const Footer = () => {
    return <footer style={{height:"60px", display:"flex", justifyContent:"center", alignItems:"center"}}>
        <Typography variant="body2" align="center" >
          {'Copyright © GRID 2023. All rights reserved.'}
        </Typography>
    </footer>
}
 
export {Footer};