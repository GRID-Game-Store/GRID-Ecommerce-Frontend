import React from 'react'
import Box from '@mui/material/Box';
import Logo from './logo';
import Navigation from './navigation';
import Search from './search';
import Avatar from './avatar';
import { Stack } from '@mui/material';
import { SPACING } from '../../constants/header';

const Header: React.FC  = () => {
  return (
    <Box sx={wrapperStyle}>
      <Stack direction="row" spacing={SPACING} >
        <Logo/>
        <Navigation/>
        <Search/>
        <Avatar/>
        </Stack>
    </Box>
  )
}
export default Header


const wrapperStyle = { height:"55px", margin:"10px", display:"flex", marginLeft:"30px", marginTop:"20px" }