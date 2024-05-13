/* eslint-disable no-unused-vars */
import { AllFiltersByNameResponse } from "@/app/types/types";
import React from "react";

export interface IFiltersProps {
  variant: "slider" | "checkbox" | "checkboxWithoutSearch";
  refetch: () => void;
  tags?: AllFiltersByNameResponse;
  name?: string;
  maxPrice?: number;
}

interface ITitleFilterGroupProps {
  name?: string;
}
interface IWrapperFilterGroupProps {
  children: React.ReactNode;
}

interface ICheckboxes {
  id: number;
  name: string;
  value: number;
}

interface ICheckboxFilterGroupProps {
  checkboxes: AllFiltersByNameResponse;
  name: string;
}


export interface IFilterProps {
  refetch: () => void;
  tags?: AllFiltersByNameResponse;
  name?: string;
  maxPrice?: number;
}

interface ISliderFilterGroupProps {
  maxPrice?: number;
}