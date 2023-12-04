"use client"
import React from 'react'
import {IItemsProps} from './types/item';
import { ItemLargePreview, ItemSmallColumn, ItemSmallRow } from './variants/item';
import { ResponseGameFullInfo } from '../../main/types/Response';



const Items: React.FC<IItemsProps> = ({game, variant = "row", setActiveHover}) => {
  if(variant === "row"){
    return game && <ItemSmallRow game={game}/>
  } else if(variant === "column"){
    return game && <ItemSmallColumn game={game} setActiveHover={setActiveHover}/>
  } else if(variant === "preview"){
    return game && <ItemLargePreview game={game as ResponseGameFullInfo} />
  } else {
    return null
  }  
}
export {Items}