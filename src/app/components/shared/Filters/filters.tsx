"use client"
import React from 'react'
import { IFiltersProps } from './types/filters'
import { FilterCheckBox, FilterSlider } from './variants/filter'
  
  
  
  const Filters: React.FC<IFiltersProps> = ({variant, refetch, tags, name}) => {
    if(variant === "slider"){
        return <FilterSlider refetch={refetch}/>
      } else if(variant === "checkbox"){
        return  <FilterCheckBox refetch={refetch} tags={tags} name={name}/>
      } else if(variant === "checkboxWithoutSearch"){
        return 
      } else {
        return null
      }  
  }
  export {Filters}

