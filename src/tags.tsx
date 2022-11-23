import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import BasicTable from './Table';
import MaterialUIPickers, { Site } from './Date';
import dayjs, { Dayjs } from 'dayjs';
import { LineUp, LineUp2, Player } from './Types';
import { getOptialLineup, getPlayerList } from './APICalls';



export default function Tags() {
  const [core, setcore] = React.useState<Array<string> | null>();
  const [optLineup, setOptLineup] = React.useState<LineUp | LineUp2 | null>();
  const [playerList, setPlayerList] = React.useState<Array<Player>>([]);
  const[site, setSite] = React.useState("FD");

  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs(new Date().toLocaleString()),
  );
  
  useEffect(() => {
    getPlayerList(date, setPlayerList);
  }, []);
  

  return (

      <Grid   container
      direction="row"
      justifyContent="center"
      alignItems="stretch"
      spacing = {2}>
        <Grid item xs={12}>
        <div>{JSON.stringify(core)}
        </div>

          <Autocomplete
            multiple
            id="tags-standard"
            options={playerList}
            getOptionLabel={(option) => option.NAME}
            defaultValue={[]}
            onChange={(event, newcore) => {
              setcore(newcore.map(x => x.NAME));
            }}
      
            renderInput={(params) => (
              <TextField
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...params}
                variant="standard"
                label="Core Players"
                placeholder="Player Name"
              />
            )}
          />
        </Grid>
        <Grid item xs={4}>
          <MaterialUIPickers d={date} setDate={setDate} setPlayerList={setPlayerList}/>
        </Grid>
        <Grid item xs={4}>
          <Site site={site} setSite={setSite} />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={()=>getOptialLineup(core, date, site, setOptLineup)}>Optimize</Button>
        </Grid>
        <Grid item xs={12}>
          {/* <div>{`Lineup: ${optLineup !== null ? JSON.stringify(optLineup): 'N/A'}`}</div> */}
          <BasicTable OptLineUp={optLineup} />
        </Grid>
      </Grid>          

    
  );
}
