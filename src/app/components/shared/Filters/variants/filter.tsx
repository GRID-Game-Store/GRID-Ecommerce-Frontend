"use client"
import { Box, Checkbox, Divider, FormControlLabel, Slider, TextField, Typography } from "@mui/material";
import { ICheckboxFilterGroupProps, ITitleFilterGroupProps, IWrapperFilterGroupProps } from "../types/filters";
import { useRouter } from 'next/navigation'
import { useQueryState } from 'nuqs'
import { AllFiltersByNameResponse } from "@/app/types/types";


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
interface IFilterProps {
  refetch: () => void
  tags?: AllFiltersByNameResponse
  name?: string
}
const WrapperFilterGroup : React.FC<IWrapperFilterGroupProps> = ({children}) => {
    return<Box
    width={"200px"}
    minHeight={"150px"}
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
      if(!window.location.search){
        push(`?maxPrice=${newValue}`)
      } else {
        const changeURL = window.location.search.replace(/maxPrice=\d+/g, `maxPrice=${newValue}`)
        push(`${changeURL}`, {scroll: false})
      }
    };

    return <>
            <Box p={"20px"} pb={"10px"} >
                <Slider onChange={handleSliderChange} aria-label="Temperature" defaultValue={30} valueLabelDisplay="auto" step={10} marks min={10} max={110}/>
                <Typography textAlign={"center"} fontSize={"20px"} fontWeight={"300"}>300</Typography>
           </Box>
    </>
}

const CheckboxFilterGroup: React.FC<ICheckboxFilterGroupProps> = ({checkboxes, name, refetch}) => {
  const [state, setState] = useQueryState(name,{ shallow: false })
  const checkboxesItems = checkboxes.map((checkbox)=> {
    const handleCheckboxChange = (event: React.SyntheticEvent, checked: boolean) => {
      checked && setState((prev) => {
        if(checkbox.id && !prev?.includes(checkbox.id.toString())){
          const newURl = prev ? `${prev},${checkbox.id}` : `${checkbox.id}`
         
          return newURl
        } else {
          return prev
        }
      })
      !checked && setState((prev) => {
        if(checkbox.id && prev?.includes(checkbox.id.toString())){
          const newParam = prev.replace(`${checkbox.id}`, ``).split(",").filter((item)=> item).join(",")
          return  newParam !== "" ? newParam : null
        } else {
          return prev
        }
      })
      refetch()
    };
    const checked = checkbox.id && state?.split(",").includes(checkbox.id.toString()) 
    const disabled = !Boolean(checked) &&  Boolean(state?.split(",").length) && name !== "tags"
        return <FormControlLabel key={checkbox.id} onChange={handleCheckboxChange} sx={{pl:"10px"}} control={<Checkbox sx={{width:'50px', height:"50px"}} />} disabled={disabled} checked={Boolean(checked)} label={checkbox.name} />
   })
    return <>
        {checkboxesItems}
    </>
}



export const FilterSlider: React.FC<IFilterProps> = ({refetch}) => {
    return (
      <WrapperFilterGroup>
        <TitleFilterGroup name={"Narrow by Price"}/>
        <SliderFilterGroup/>
      </WrapperFilterGroup>
    );
  };

export const FilterCheckBox: React.FC<IFilterProps> = ({refetch, tags, name}) => {

    return (
      <WrapperFilterGroup>
        <TitleFilterGroup name={name}/>
        {tags && name && <CheckboxFilterGroup checkboxes={tags} refetch={refetch} name={name?.toLowerCase()}/>}
        <TextField placeholder="Search"/>
      </WrapperFilterGroup>
    );
};