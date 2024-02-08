"use client";
import TextField from "@mui/material/TextField";
import { useQuery } from "@tanstack/react-query";
import { getGamesByTitle } from "../api/search";
import { useState } from "react";
import { useDebounce } from "use-debounce";

import { Box, Skeleton, SxProps, Typography, useMediaQuery } from "@mui/material";
import {
  ItemSmallColumnForSearch,
} from "../../shared/Item/variants/item";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { RandomResponse } from "@/app/types/types";

const SkeletonItem = () => {
  return (
    <Box
      ml={"10px"}
      mt={"-2px"}
      display={"flex"}
      flexDirection={"row"}
      pb={"25px"}
      
    >
      <Skeleton
        variant="rectangular"
        sx={{ backgroundColor: "#08ad2c33", borderRadius: "5px" }}
        width={144}
        height={60}
      />
      <Box ml={"10px"}>
        <Skeleton
          variant="text"
          sx={{ backgroundColor: "#08ad2c33", borderRadius: "5px" }}
          width={144}
          height={20}
        />
        <Skeleton
          variant="text"
          sx={{ backgroundColor: "#08ad2c33", borderRadius: "5px" }}
          width={190}
          height={20}
        />
        <Skeleton
          variant="text"
          sx={{ backgroundColor: "#08ad2c33", borderRadius: "5px" }}
          width={144}
          height={20}
        />
      </Box>
    </Box>
  );
};
const SkeletonWrapper = () => {
  return <>
  <SkeletonItem />
  <SkeletonItem />
  <SkeletonItem />
</>
}
const NotFound = () => {
  return <Box height={266} display={"flex"} justifyContent={"center"} alignItems={"center"}>
    <Typography fontSize="20px" mt={"-20px"} ml={"0px"} > Not found :(</Typography>
  </Box>
}




const Search: React.FC = () => {
  const [value, setValue] = useState("");
  const [isFocus, setFocus] = useState(0);
  const matches = useMediaQuery('(min-width:1200px)');
  const debouncedFilter = useDebounce<string>(value, 500);
  const { data, isSuccess, isLoading, isFetched } = useQuery({
    queryKey: ["game", debouncedFilter],
    queryFn: () => getGamesByTitle(debouncedFilter[0]),
  });
  const items = data && data.map((game: RandomResponse[0]) => {
    return (
      <div key={game.id}>
        <ItemSmallColumnForSearch game={game} />
      </div>
    );
  })



  return (
    <Box  onMouseEnter={() => setFocus(1)} onMouseLeave={() => setFocus(0)} >
      <TextField
        sx={{ width: "300px" }}
        placeholder="Search"
        autoComplete="off"
        aria-label="Search"
        name="hidden"
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
          value  ?  setFocus(1) : setFocus(0)
        }}
      />
      <TransitionGroup>
          <CSSTransition key={isFocus} timeout={250} classNames="search">
      {isFocus ? (
        <Box
          mt={"12px"}
          width={400}
          pt={"12px"}
          pb={"5px"}
          sx={BoxWrapper}
          position={"absolute"}
          right={!matches ? "4vw": undefined}
        >
          {isSuccess && items}
          {isLoading && !isFetched &&  <SkeletonWrapper/>}
          {data && !data[0] && <NotFound/>}
        </Box>
      ) : <></>}
       </CSSTransition>
      </TransitionGroup>
    </Box>
  );
};

export default Search;
const BoxWrapper: SxProps = {
  background: "#000",
  position: "absolute",
  zIndex: "2",
  borderRadius: "0px 0px 10px 5px",
  boxShadow: "0 5px 15px rgba(8,173,44,0.2 )",
  
}