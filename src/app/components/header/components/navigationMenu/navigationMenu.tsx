"use client"
import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { NavigationMenuFade } from './navigationMenuFade';
import Navigation from './navigation';
import Hydrate from '@/app/reactQuery/Hydrate';
import Search from '../search';
import { AuthenticationActions } from '../authenticationActions';
import { dehydrate } from '@tanstack/react-query';
import getQueryClient from '@/app/reactQuery/get-query-client';





const NavigationMenuMobile = ()  => {
  const [isShowMenu, setShowMenu] = useState(false);
  return (
    <Box>
      <IconButton onClick={() => setShowMenu(true)} aria-label="menu" sx={{color:'#fff', position:"absolute", right:"40px"}}>
      <MenuIcon sx={{fontSize:'30px'}} />
    </IconButton>
    <NavigationMenuFade isShowMenu={isShowMenu} setShowMenu={setShowMenu}/>
    </Box>
  );
}
const NavigationMenuDesktop = ()  => {
  const queryClient = getQueryClient();
  const dehydratedState = dehydrate(queryClient);
  return <>
          <Navigation/>
          <Hydrate state={dehydratedState}>
          <Search/>
          </Hydrate >
      <AuthenticationActions/>
    </>

}

export {NavigationMenuMobile, NavigationMenuDesktop}