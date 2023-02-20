import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Button, Container, Grid } from '@mui/material';
import DateSelector, { Site } from './Date';
import dayjs, { Dayjs } from 'dayjs';
import { getOptialLineup, getPlayerList } from './APICalls';
import Sport from './Sport';
import BasicTable from './Table';
import { LineUp } from './Types';



export default function DFS() {
  const [core, setcore] = React.useState<Array<string> | null>();
  const [optLineup, setOptLineup] = React.useState<LineUp | null>();
  const [playerList, setPlayerList] = React.useState<string[]>([]);
  const[site, setSite] = React.useState("FD");

  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs(new Date().toLocaleString()),
  );
  const [sport, setSport] = React.useState("NBA");

  
  useEffect(() => {
    getPlayerList(sport, date, setPlayerList);
  }, []);
  

  return (
    <Container maxWidth ="md">

      <Grid container direction="row" alignItems="stretch" spacing = {2}>
        <Grid item xs={12}>
        <div>{JSON.stringify(core)}
        </div>
          <Autocomplete
            multiple
            id="tags-standard"
            options={playerList}
            getOptionLabel={(option) => option}
            defaultValue={[]}
            onChange={(event, newcore) => {
              setcore(newcore.map(x => x));
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
        <Grid item xs={2}>
          <DateSelector sport={sport} d={date} setDate={setDate} setPlayerList={setPlayerList}/>
        </Grid>
        <Grid item xs={2}>
          <Site site={site} setSite={setSite} />
        </Grid>
        <Grid item xs={2}>
          <Sport sport={sport} date={date} setSport={setSport}  setPlayerList={setPlayerList} />
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" onClick={()=>getOptialLineup(core, date, site, sport, setOptLineup)}>Optimize</Button>
        </Grid>
        <Grid item xs={12}>
          {/* <div>{`Lineup: ${optLineup !== null ? JSON.stringify(optLineup): 'N/A'}`}</div> */}
          <BasicTable OptLineUp={optLineup} />
        </Grid>
      </Grid>              
    </Container>
  );
}
