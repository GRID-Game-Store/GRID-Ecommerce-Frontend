import TextField from "@mui/material/TextField";

const Search: React.FC = () => {
  return (
    <TextField
      sx={{width: "300px"}}
      placeholder="Search"
      autoComplete="off"
    />

  );
};

export default Search;


