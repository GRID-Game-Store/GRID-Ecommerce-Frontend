"use client";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import {
  ICheckboxFilterGroupProps,
  IFilterProps,
  ISliderFilterGroupProps,
  ITitleFilterGroupProps,
  IWrapperFilterGroupProps,
} from "../types/filters";
import { useQueryState } from "nuqs";
import React from "react";
import { ArrowDownIcon } from "lucide-react";
import { UAH } from "../../currency/UAH";


export const WrapperFilterGroup: React.FC<IWrapperFilterGroupProps> = ({
  children,
}) => {
  return (
    <Box
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
  );
};

export const TitleFilterGroup: React.FC<ITitleFilterGroupProps> = ({ name }) => {
  return (
    <>
      <Typography pl={"12px"} fontSize={"20px"} fontWeight={"600"}>
        {name}
      </Typography>

      <Divider />
    </>
  );
};

const SliderFilterGroup: React.FC<ISliderFilterGroupProps> = ({ maxPrice }) => {
  const [maxPriceURL, setMaxPriceURL] = useQueryState("maxPrice", { shallow: false });
  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setMaxPriceURL(newValue.toString());
  };

  return (
    <>
      { maxPrice && <Box p={"20px"} pb={"10px"}>
        <Slider
          onChange={handleSliderChange}
          aria-label="Temperature"
          defaultValue={maxPrice}
          valueLabelDisplay="auto"
          step={150}
          marks
          min={0}
          max={maxPrice}
          value={maxPriceURL ? parseInt(maxPriceURL) : ++maxPrice  }
        />
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
        <Typography textAlign={"center"} fontSize={"20px"} fontWeight={"300"}>
          {maxPriceURL ? maxPriceURL : maxPrice} 
        </Typography>
        <UAH />
        </Box>
      </Box>}
    </>
  );
};






const CheckboxFilterGroup: React.FC<ICheckboxFilterGroupProps> = ({
  checkboxes,
  name,
}) => {
  const [state, setState] = useQueryState(name, { shallow: false });
  const isTags = name === "tags";
  const checkboxesItems = checkboxes.map((checkbox) => {
    const handleCheckboxChange = (
      event: React.SyntheticEvent,
      checked: boolean
    ) => {
      checked &&
        setState((prev) => {
          if (checkbox.id && !prev?.includes(checkbox.name.toString())) {
            const newURl = prev
              ? `${prev},${!isTags ? checkbox.name : checkbox.id}`
              : `${!isTags ? checkbox.name : checkbox.id}`;
            return newURl;
          } else {
            return prev;
          }
        });
      !checked &&
        setState((prev) => {
          if (checkbox.name || checkbox.id && prev?.includes(checkbox.name.toString())) {
            const newParam = prev && prev
              .replace(`${!isTags ? checkbox.name : checkbox.id}`, "")
              .split(",")
              .filter((item) => item)
              .join(",");
            return newParam !== "" ? newParam : null;
          } else {
            return prev;
          }
        });
    };

    const checked =
       isTags && checkbox.id  ? state?.split(",").includes(checkbox.id.toString()) : state?.includes(checkbox.name.toString());
    const disabled =
      !Boolean(checked) && Boolean(state?.split(",").length) && name !== "tags";

    return (
      <FormControlLabel
        key={checkbox.name}
        onChange={handleCheckboxChange}
        sx={{ pl: "10px" }}
        control={<Checkbox sx={{ width: "50px", height: "50px" }} />}
        disabled={disabled}
        checked={Boolean(checked)}
        label={checkbox.name}
      />
    );
  });
  return <>{checkboxesItems}</>;
};

export const FilterSlider: React.FC<IFilterProps> = ({maxPrice}) => {
  return (
    <WrapperFilterGroup>
      <TitleFilterGroup name={"Narrow by Price"} />
      <SliderFilterGroup maxPrice={maxPrice} />
    </WrapperFilterGroup>
  );
};

export const FilterCheckBox: React.FC<IFilterProps> = ({
  tags,
  name,
}) => {
  const [counterItems, setCounterItems] = React.useState(10);
  const [valueSearch, setValueSearch] = React.useState("");
  const MoreThenInitialValue = tags && tags?.length > 10;
 
  
  const filteredTags = tags && tags.slice(0, counterItems).filter((tag) => tag.name.toLowerCase().includes(valueSearch.toLowerCase()))
  return (
    <WrapperFilterGroup>
      <TitleFilterGroup name={name} />
      <TextField value={valueSearch}  onChange={(e) => setValueSearch(e.target.value)} placeholder={`Search ${name}`} />
      {tags && name && (
        <CheckboxFilterGroup
          checkboxes={filteredTags || []}
          name={name?.toLowerCase()}
        />
      )}
      {MoreThenInitialValue && counterItems <  tags?.length - 1   && (
        <Button
          onClick={() => counterItems < tags?.length && setCounterItems(counterItems + 10)}
          sx={{ width: "100%" }}
        >
          <ArrowDownIcon size={15} />
        </Button>
      )}
    </WrapperFilterGroup>
  );
};
