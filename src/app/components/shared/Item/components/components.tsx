

import React, { MutableRefObject, useRef, useState } from 'react'
import { Box, Button, Chip, Stack, Tooltip } from '@mui/material'
import { Typography } from '@mui/material';

import { ICoverItemProps, IListTagsOrGenresProps, ITypographyItemProps } from '../types/item';
import Link from 'next/link';


//! TODO FIX WARN WITH REF
export const CoverItem: React.FC<ICoverItemProps> = ({linkCoverImg, width, hover, ref, linkCoverVideo}) => {
    const [hoverOnTheiler, setHoverOnTheiler ] = useState(false)
    return <>
      { hover === 0 || hover === undefined ? 
      <img  ref={ref}  style={{borderRadius:"5px"}} width={width}  src={linkCoverImg} alt="cover item"   /> : 
      <video onMouseEnter={() => setHoverOnTheiler(true)} onMouseLeave={() => setHoverOnTheiler(false)} controls={hoverOnTheiler} ref={ref} poster={linkCoverImg}  width={width} height={223} autoPlay muted src={linkCoverVideo}></video>
       }
    </>
}

export const TypographyItem: React.FC<ITypographyItemProps>  = ({fontSize, whiteSpace, text, mt, ml, p, link }) => {
  if(link){
    return <Link href={link}>
        <Typography sx={{whiteSpace:whiteSpace, textOverflow:"ellipsis", overflow:"hidden"}} mt={mt} ml={ml} p={p}  fontSize={fontSize}>{text}</Typography>
    </Link>
  } else {
    return <Typography sx={{whiteSpace:whiteSpace, textOverflow:"ellipsis", overflow:"hidden"}} mt={mt} ml={ml} p={p}  fontSize={fontSize}>{text}</Typography>
  }

  
} 

export const ListTagsOrGenres: React.FC<IListTagsOrGenresProps> = ({arrayElements, mt, ml, spacing = 1, mb = "10px", spaceBetween}) => {
  return <Stack  sx={ spacing == 0 ?  { flexWrap: "wrap", maxWidth: "350px" } : { justifyContent: spaceBetween ? "space-between" : null}} direction={"row"} spacing={spaceBetween ? 0 : spacing} mb={mb} ml={ml} mt={mt}>
    {arrayElements && arrayElements.map((el) => {
     return <div key={el.id}>
        <Tooltip title={el.name}>
       <Chip label={el.name} sx={{fontSize:"12px", marginTop: spacing == 0 ? "7px" : null, marginLeft: spacing == 0 ?  "5px" : null, maxWidth: "70px" }} />
       </Tooltip>
      </div>
    })}
</Stack>
}
