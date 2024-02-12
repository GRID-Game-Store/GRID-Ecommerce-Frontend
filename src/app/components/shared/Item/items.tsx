"use client"
import React from 'react'
import {IItemsProps} from './types/item';
import { ItemLargePreview, ItemSmallColumn, ItemSmallRow } from './variants/item';
import { FullInfoResponse } from '@/app/types/types';




const Items: React.FC<IItemsProps> = ({game, variant = "row", setActiveHover, width}) => {
  if(variant === "row"){
    return game && <ItemSmallRow game={game}/>
  } else if(variant === "column"){
    return game && <ItemSmallColumn game={game} setActiveHover={setActiveHover}/>
  } else if(variant === "preview"){
    return game && <ItemLargePreview width={width} game={game as FullInfoResponse} />
  } else {
    return null
  }  
}
export {Items}