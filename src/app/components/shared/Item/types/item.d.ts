import { MetaData, ResponseGameFullInfo, ResponseGameRandom } from "@/app/components/main/types/Response";

export interface IItemsProps {
  game: ResponseGameFullInfo | ResponseGameRandom ;
  variant?: string;
  setActiveHover?: () => void
}

export interface ICoverItemProps {
  linkCoverImg: string;
  linkCoverVideo?: string;
  width: number;
  variant?: string;
  hover?: number;
  ref?: MutableRefObject<null>;
}

type TFontSizeForTypography = string;
type TWhiteSpaceForTypography = "nowrap" | "normal";
export interface ITypographyItemProps {
  fontSize: TFontSizeForTypography;
  whiteSpace: TWhiteSpaceForTypography;
  text: string;
  mt?: string;
  ml?: string;
  p?: string;
  link?: string | boolean;

}

export interface IListTagsOrGenresProps {
  arrayElements: Array<MetaData>;
  mt?: string;
  ml?: string;
  spacing?: number;
  mb?: string;
  spaceBetween?: boolean
}

export interface IItem{
    game : ResponseGameRandom
    setActiveHover?: () => void

}

export interface IItemLargePreview {
  game: ResponseGameFullInfo 

}


export type THover = 0 | 1 
