import { MetaData } from '@/app/components/main/types/Response';
import { FullInfoResponse } from '@/app/types/types';

import { RandomResponse } from '../../../../types/types';

export interface IItemsProps {
  game: FullInfoResponse | RandomResponse[0] ;
  variant?: "row" | "column" | "preview";
  width?: string 
  setActiveHover?: () => void
  isCart?: boolean
}


export interface ICoverItemProps {
  linkCoverImg?: string;
  linkCoverVideo?: string;
  width: number;
  variant?: string;
  hover?: number;
  minHeight?: number;
}

type TFontSizeForTypography = string;
type TWhiteSpaceForTypography = "nowrap" | "normal";
export interface ITypographyItemProps {
  fontSize: TFontSizeForTypography;
  whiteSpace: TWhiteSpaceForTypography;
  text?: string;
  mt?: string;
  ml?: string;
  p?: string;
  link?: string | boolean;

}

export interface IListTagsOrGenresProps {
  arrayElements?: Array<MetaData>;
  mt?: string;
  ml?: string;
  spacing?: number;
  mb?: string;
  spaceBetween?: boolean
}

export interface IItem{
    game : RandomResponse[0]
    setActiveHover?: () => void
    isCart ?: boolean

}

export interface IItemLargePreview {
  game: FullInfoResponse  
  width?: string

}
export interface IButtonBuyProps{
  href: string;
  price: string | number;
}

export type THover = 0 | 1 
