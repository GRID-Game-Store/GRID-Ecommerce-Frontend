"use client"
import React from 'react'
import { IFiltersProps } from './types/filters'
import { FilterCheckBox, FilterSlider } from './variants/filter'
  
  
  
  const Filters: React.FC<IFiltersProps> = ({variant}) => {
    if(variant === "slider"){
        return <FilterSlider/>
      } else if(variant === "checkbox"){
        return  <FilterCheckBox/>
      } else if(variant === "checkboxWithoutSearch"){
        return 
      } else {
        return null
      }  
  }
  export {Filters}

