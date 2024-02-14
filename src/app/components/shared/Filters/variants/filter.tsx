"use client"
import { Box, Checkbox, Divider, FormControlLabel, Slider, TextField, Typography } from "@mui/material";
import { ICheckboxFilterGroupProps, ITitleFilterGroupProps, IWrapperFilterGroupProps } from "../types/filters";
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useState } from "react";
import { useSearchParams } from 'next/navigation'
const mockCheckBoxSlider = [
    {
        id: 0,
        name : "Special offers",
        value: 0
    },
    {
        id: 1,
        name : "Hide free to paly games",
        value: 0
    }

]

const mockCheckBoxCheckbox = [
    {
      "id": 1,
      "name": "Action",
      "value": 42
    },
    {
      "id": 2,
      "name": "Adventure",
      "value": 73
    },
    {
      "id": 3,
      "name": "Simulation",
      "value": 15
    },
    {
      "id": 4,
      "name": "Sports",
      "value": 88
    },
    {
      "id": 5,
      "name": "Strategy",
      "value": 57
    },

  ]

const WrapperFilterGroup : React.FC<IWrapperFilterGroupProps> = ({children}) => {
    return<Box
    width={"200px"}
    minHeight={"250px"}
    bgcolor={"#0a0a0adb"}
    overflow={"hidden"}
    pt={"5px"}
    mb={"12px"}
    ml={"20px"}
    borderRadius={"5px"}
    display={"flex"}
    flexDirection={"column"}
  >
    {children}
  </Box>


}

const TitleFilterGroup: React.FC<ITitleFilterGroupProps> = ({name}) => {
    return<>
        <Typography pl={"12px"} fontSize={"20px"} fontWeight={"600"}>{name}</Typography>
        <Divider  />
    </>


}

const SliderFilterGroup: React.FC = () => {
    const {push} = useRouter()
    const handleSliderChange = (event: Event, newValue: number | number[]) => {

      !window.location.search || window.location.search.includes("maxPrice") && push(`?maxPrice=${newValue}`)
      window.location.search && !window.location.search.includes("maxPrice") && push(`${window.location.search}&maxPrice=${newValue}`)
    };

    return <>
            <Box p={"20px"} pb={"10px"} >
                <Slider  onChange={handleSliderChange} aria-label="Temperature" defaultValue={30} valueLabelDisplay="auto" step={10} marks min={10} max={110}/>
                <Typography textAlign={"center"} fontSize={"20px"} fontWeight={"300"}>300</Typography>
           </Box>
           <Divider  />
    </>
}

const CheckboxFilterGroup: React.FC<ICheckboxFilterGroupProps> = ({checkboxes}) => {
  const {push} = useRouter()
  const searchParams = useSearchParams()

  const tags = searchParams.get('tags')


   const checkboxesItems = checkboxes.map((checkbox)=> {
    const url = decodeURI(searchParams.toString())
    console.log(url);
    
    const handleCheckboxChange = (event: React.SyntheticEvent, checked: boolean) => {
      const url = searchParams.toString()
      if(window.location.href.includes("tags")){
        
        
        // checked && push(`${window.location.search},${checkbox.id}`)
        
        // !checked && tags?.length !== 1 && push(`${window.location.search.replace(`,${checkbox.id}`,'')}`)
        // !checked && tags?.length === 1 && push(`${window.location.search.replace(`tags=${checkbox.id}`,'')}`)
        
      } else {
        // !window.location.search && push(`?tags=${checkbox.id}`)
        // window.location.search && push(`${window.location.search}&tags=${checkbox.id}`)
      }
    };
        return <FormControlLabel key={checkbox.id} onChange={handleCheckboxChange} sx={{pl:"10px"}} control={<Checkbox sx={{width:'50px', height:"50px"}} />} label={checkbox.name} />
   })
    return <>
        {checkboxesItems}
    </>
}



export const FilterSlider: React.FC = () => {
    return (
      <WrapperFilterGroup>
        <TitleFilterGroup name={"Narrow by Price"}/>
        <SliderFilterGroup/>
        <CheckboxFilterGroup checkboxes={mockCheckBoxSlider}/>
      </WrapperFilterGroup>
    );
  };

export const FilterCheckBox: React.FC = () => {
    return (
      <WrapperFilterGroup>
        <TitleFilterGroup name={"Tags"}/>
        <CheckboxFilterGroup checkboxes={mockCheckBoxCheckbox}/>
        <TextField placeholder="Search"/>
      </WrapperFilterGroup>
    );
};