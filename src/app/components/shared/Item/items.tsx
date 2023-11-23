"use client"
import React from 'react'
import {IItemsProps} from './types/item';
import { ItemLargePreview, ItemSmallColumn, ItemSmallRow } from './variants/item';


const Items: React.FC<IItemsProps> = ({game, variant = "row"}) => {
  if(variant === "row"){
    return <ItemSmallRow game={game}/>
  } else if(variant === "column"){
    return <ItemSmallColumn game={game}/>
  } else if(variant === "preview"){
    return game && <ItemLargePreview game={game}/>
  } else {
    return null
  }  
}
export {Items}