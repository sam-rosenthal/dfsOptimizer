import * as React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useEffect } from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import BasicTable from './Table';
import MaterialUIPickers, { Site } from './Date';
import dayjs, { Dayjs } from 'dayjs';

function getPlayerList(getPlayers: { (value: React.SetStateAction<Player[]>): void; (arg0: Player[]): void; })  {
  let players:Array<Player> = [] 
  fetch('/DFSData').then(
    res => {return res.json()}).then((data) =>{
      const x = JSON.parse(data);
      players = Object.values(x);
      getPlayers(players)
      // console.log(players);
  }).catch(err => console.log(err));
  return players;
}

async function callApi2(coreList: string[] | null | undefined, d: dayjs.Dayjs | null, site: string, setOptLineup: { (value: React.SetStateAction<LineUp | LineUp2 | null | undefined>): void; (arg0: LineUp| LineUp2): void; }){
  console.log(JSON.stringify({ core: coreList}));
  let date = "";
  if(d !== null){
    date = d.format("MM/DD/YY");
  }
  fetch('/DFSData', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ core: coreList, date: date, site: site})
    }).then(
      res => { return res.json()}
    ).then(
      (data) =>{
      console.log(data);
      setOptLineup(data);
  }).catch(err => console.log(err));
}

export default function Tags() {
  const [core, setcore] = React.useState<Array<string> | null>();
  const [optLineup, setOptLineup] = React.useState<LineUp | LineUp2 | null>();
  const [playerList, getPlayers] = React.useState<Array<Player>>([]);
  const[site, setSite] = React.useState("FD");

  const [date, setDate] = React.useState<Dayjs | null>(
    dayjs(new Date().toLocaleString()),
  );
  
  useEffect(() => {
    getPlayerList(getPlayers);
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
          <MaterialUIPickers d={date} setDate={setDate} />
        </Grid>
        <Grid item xs={4}>
          <Site site={site} setSite={setSite} />
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" onClick={()=>callApi2(core, date, site, setOptLineup)}>Optimize</Button>
        </Grid>
        <Grid item xs={12}>
          {/* <div>{`Lineup: ${optLineup !== null ? JSON.stringify(optLineup): 'N/A'}`}</div> */}
          <BasicTable OptLineUp={optLineup} />
        </Grid>
      </Grid>          

    
  );
}
type Player = {
  NAME: string,
  POSITION: string,
  SALARY: string
}
export type LineUp = {
  C: Array<PlayerProj>,
  PF: Array<PlayerProj>,
  SF: Array<PlayerProj>,
  SG: Array<PlayerProj>,
  PG: Array<PlayerProj>
}
export type LineUp2 = {
  C: Array<PlayerProj>,
  PF: Array<PlayerProj>,
  SF: Array<PlayerProj>,
  SG: Array<PlayerProj>,
  PG: Array<PlayerProj>,
  G: Array<PlayerProj>,
  F: Array<PlayerProj>,
  UTIL:Array<PlayerProj>
}
export type PlayerProj = {
  Name: string,
  Salary: number,
  Projection: number
}
