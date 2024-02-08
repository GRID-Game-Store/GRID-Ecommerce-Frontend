
"use client"
import React from 'react'
import Box from '@mui/material/Box';
import Logo from './components/logo/logo';
import {SxProps } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import {NavigationMenuDesktop, NavigationMenuMobile} from './components/navigationMenu/navigationMenu';

const Header = () => {
  const matches = useMediaQuery('(min-width:1200px)');
  const wrapperRowStyle: SxProps = { display:"flex", flexDirection:"row", justifyContent: matches === false ? "center" : "space-between",  width:"100%", pl:"20px", pr:"20px" }

  return (
    <Box sx={wrapperStyle}>
      <Box sx={wrapperRowStyle}  >
        <Logo/>
        {matches ? <NavigationMenuDesktop/> : <NavigationMenuMobile/> }
        </Box>
    </Box>
  )
}
export default Header


const wrapperStyle: SxProps = { display:"flex", paddingTop:"20px", paddingBottom:"10px", position:"fixed", background: "#000", zIndex: "20", width:"100%" }



