"use client"
import React from 'react';

import { FullInfoResponse } from '@/app/types/types';

import { IItemsProps } from './types/item';
import {
  ItemLargePreview,
  ItemSmallColumn,
  ItemSmallRow,
} from './variants/item';

const Items: React.FC<IItemsProps> = ({game, variant = "row", setActiveHover, width, isCart}) => {

  
  if(variant === "row"){
    return game && <ItemSmallRow game={game}/>
  } else if(variant === "column"){
    return game && <ItemSmallColumn game={game} setActiveHover={setActiveHover} isCart={isCart}/>
  } else if(variant === "preview"){
    return game && <ItemLargePreview width={width} game={game as FullInfoResponse} />
  } else {
    return null
  }  
}
export { Items };