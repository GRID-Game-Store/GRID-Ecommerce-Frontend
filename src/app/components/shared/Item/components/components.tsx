

import React, { Dispatch, SetStateAction, forwardRef, useState } from 'react'
import { Box, Button, Chip, Stack, Tooltip } from '@mui/material'
import { Typography } from '@mui/material';
import { IButtonBuyProps, ICoverItemProps, IListTagsOrGenresProps, ITypographyItemProps, THover } from '../types/item';
import Link from 'next/link'
import { TransitionGroup, CSSTransition } from "react-transition-group";








//! TODO FIX WARN WITH REF
export const CoverItem: React.FC<ICoverItemProps> = ({linkCoverImg, width, hover, linkCoverVideo, minHeight = "70px"}) => {
    const [hoverOnTheiler, setHoverOnTheiler ] = useState(false)
    const customHeight = minHeight !== "70px" && minHeight
    return <>
      { hover === 0 || hover === undefined ? 
      <img  style={{borderRadius:"5px", minHeight: minHeight, cursor:"pointer", objectFit:"cover"}} width={width} height={customHeight.toString()}  src={linkCoverImg} alt="cover item"   /> : 
      <video style={{cursor:"pointer"}} onMouseEnter={() => setHoverOnTheiler(true)} onMouseLeave={() => setHoverOnTheiler(false)} controls={hoverOnTheiler}  poster={linkCoverImg}  width={width} height={223} autoPlay muted src={linkCoverVideo}></video>
       }
    </>
}

export const TypographyItem: React.FC<ITypographyItemProps>  = ({fontSize, whiteSpace, text, mt, ml, p, link }) => {
  if(link){
    return <Link href={`${link}`} style={{color:"#fff"}}>
        <Typography sx={{whiteSpace:whiteSpace, textOverflow:"ellipsis", overflow:"hidden"}} mt={mt} ml={ml} p={p}  fontSize={fontSize}>{text}</Typography>
    </Link>
  } else {
    return <Typography sx={{whiteSpace:whiteSpace, textOverflow:"ellipsis", overflow:"hidden"}} mt={mt} ml={ml} p={p}  fontSize={fontSize}>{text}</Typography>
  }

  
} 

export const ListTagsOrGenres: React.FC<IListTagsOrGenresProps> = ({arrayElements, mt, ml, spacing = 1, mb = "10px", spaceBetween}) => {
  return <Stack sx={ spacing == 0 ?  { flexWrap: "wrap", maxWidth: "350px" } : { justifyContent: spaceBetween ? "space-between" : null}} direction={"row"} spacing={spaceBetween ? 0 : spacing} mb={mb} ml={ml} mt={mt}>
                {arrayElements && arrayElements.map((el, i) => {
                return <div key={el.id + "_" + i}>
                    <Tooltip title={el.name}>
                      <Chip label={el.name} sx={{fontSize:"12px", marginTop: spacing == 0 ? "7px" : null, marginLeft: spacing == 0 ?  "5px" : null, maxWidth: "70px" }} />
                  </Tooltip>
                  </div>
                })}
          </Stack>
}


export const ButtonBuy: React.FC<IButtonBuyProps> = ({price, href}) => {
  const FreeORPrice = price ? price + "" : "free"
  return <Link href={href}>
    <Button sx={{width:"100%", position:"absolute", bottom:"0", height:"100%"}}>{FreeORPrice}</Button>  
  </Link>
  
}



interface IItemLargePreviewWrapperProps {
  width: string;
  setHover: Dispatch<SetStateAction<THover>>;
  children: React.ReactNode
}
interface IItemLargePreviewAnimationProps {
  hover: THover;
  children: React.ReactNode
}

export const ItemLargePreviewWrapper: React.FC<IItemLargePreviewWrapperProps> = ({width, setHover, children}) => {
    return <Box
    width={width}
    height={"650px"}
    bgcolor={"#0a0a0adb"}
    overflow={"hidden"}
    position={"relative"}
    ml={"20px"}
    borderRadius={"5px"}
    onMouseEnter={() => setHover && setHover(1)}
    onMouseLeave={() => setHover && setHover(0)}
    >
      {children}
    </Box>
}


export const ItemLargePreviewAnimation: React.FC<IItemLargePreviewAnimationProps> = ({hover, children}) => {
  return <Box width={390} height={223}>
  <TransitionGroup>
      <CSSTransition key={hover} timeout={500} classNames="item">
          {children}
      </CSSTransition>
  </TransitionGroup>
</Box>
}