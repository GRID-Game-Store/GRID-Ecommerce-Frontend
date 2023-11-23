export interface IItemsProps {
  game: ResponseGameRandom;
  variant?: string;
}

export interface ICoverItemProps {
  link: string;
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
}

export interface IListGamesProps {
  amountEl: number;
  mt?: string;
  ml?: string;
  spacing?: number;
  mb?: string;
}

export interface IItemSmallRow {
    game : ResponseGameRandom
}

export type THover = 0 | 1 
