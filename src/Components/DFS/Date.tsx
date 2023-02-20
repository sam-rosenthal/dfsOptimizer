import * as React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Container, Switch, Typography } from '@mui/material';
import { getPlayerList } from './APICalls';


interface Props {
  d: Dayjs|null,
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>,
  setPlayerList:  React.Dispatch<React.SetStateAction<string[]>>,
  sport: string
}

export default function DateSelector(props:Props) {
  const handleChange = (newValue: Dayjs | null) => {
    props.setDate(newValue);
    getPlayerList(props.sport,newValue,props.setPlayerList);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/DD/YY"
          value={props.d}
          onChange={handleChange}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  );
}

interface Props2 {
  site: string, 
  setSite: React.Dispatch<React.SetStateAction<string>>
}

export function Site(props: Props2){
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if(event.target.checked){
      props.setSite("FD");
    }
    else{
      props.setSite("DK")
    }
  };

  return (
    <Container>
    <Stack
      direction="row"
      // justifyContent="center"
      alignItems="center"
      spacing={1}
    >          
    <Typography>DK</Typography>
          <Switch
            checked={checked}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
            // color = "success"
            // label = {props.site}
        />
        <Typography>FD</Typography>
      </Stack>
    </Container>
      );
}