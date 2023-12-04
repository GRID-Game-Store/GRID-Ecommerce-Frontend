import { ResponseGamePopular } from "../../types/Response";


export interface ITitleProps {
  title: string;
}
export interface IDescriptionProps {
  description: string;
}
export interface IPricingProps {
  prise: number;
}
export type TSlierItemsProps = {
  slides: ResponseGamePopular;
  current: number;
  setCurrent: (i: number) => void;
  setIsTouched: (value: boolean) => void;
};

export type IButtonsNavigate = {
  current: number;
  setCurrent: (i: number) => void;
  setIsTouched: (value: boolean) => void;
};
