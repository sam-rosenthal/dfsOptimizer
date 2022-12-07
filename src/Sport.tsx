import { SelectChangeEvent, Box, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Dayjs } from "dayjs";
import React from "react";
import { getPlayerList } from "./APICalls";

interface Props {
  date: Dayjs|null,
  sport:string,
  setSport: React.Dispatch<React.SetStateAction<string>>,
  setPlayerList:  React.Dispatch<React.SetStateAction<string[]>>,
}

export default function Sport(props: Props) {
  const handleChange = (event: SelectChangeEvent) => {
    props.setSport(event.target.value);
    getPlayerList(event.target.value,props.date,props.setPlayerList);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Sport</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props.sport}
          label="Sport"
          onChange={handleChange}
        >
          <MenuItem value={"NBA"}>NBA</MenuItem>
          <MenuItem value={"NFL"}>NFL</MenuItem>
          <MenuItem value={"NFL SD"}>NFL SD</MenuItem>
          <MenuItem value={"NHL"}>NHL</MenuItem>
          <MenuItem value={"SOCCER"}>SOCCER</MenuItem>
          <MenuItem value={"MMA"}>MMA</MenuItem>
          <MenuItem value={"CBB"}>CBB</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}