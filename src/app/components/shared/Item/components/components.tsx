import React, { MutableRefObject, useRef, useState } from 'react'
import { Box, Button, Chip, Stack } from '@mui/material'
import { Typography } from '@mui/material';
import {
  TransitionGroup,
  CSSTransition,
} from "react-transition-group";
import { ICoverItemProps, IListGamesProps, ITypographyItemProps } from '../types/item';



export const CoverItem: React.FC<ICoverItemProps> = ({link, width, hover, ref}) => {
    return <>
      { hover === 0 || hover === undefined ? 
      <img  ref={ref}  style={{borderRadius:"5px"}} width={width}  src={link} alt="cover item"   /> : 
      <video ref={ref} poster={link}  width={width} autoPlay muted src="https://cdn.cloudflare.steamstatic.com/steam/apps/256753058/movie480.webm?t=1560875080" ></video>
       }
    </>
}
export const TypographyItem: React.FC<ITypographyItemProps>  = ({fontSize, whiteSpace, text, mt, ml, p }) => {
  return <Typography sx={{whiteSpace:whiteSpace, textOverflow:"ellipsis", overflow:"hidden"}} mt={mt} ml={ml} p={p}  fontSize={fontSize}>{text}</Typography>
} 



export const ListGames: React.FC<IListGamesProps> = ({amountEl, mt, ml, spacing = 2, mb = "10px"}) => {
  const arr = Array.from(Array(amountEl).keys())
  return <Stack direction={"row"} spacing={spacing} mb={mb} ml={ml} mt={mt}>
    {arr.map((el, i) => {
     return <>
       <Chip key={el} label="HORROR" sx={{fontSize:"12px"}} />
      </>
    })}
</Stack>
}
