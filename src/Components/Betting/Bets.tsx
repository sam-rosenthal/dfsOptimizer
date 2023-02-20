import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';

import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

// register Handsontable's modules
registerAllModules();


type PlayerOdds = {
  Prop:string,
  Player: string,
  Team: string,
  // Opp: string,
  Projection: number,
  "O/U Line":number,
  Difference: number,
  Play: string,
  Odds: string
}

export default function BetsTable() {
  const [betData, setBetData] = React.useState<PlayerOdds[]>([]);
  async function callApi()  {

    return fetch('https://b0k72uj5x5.execute-api.us-east-1.amazonaws.com/prod/bets',{
      method: 'POST', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ sport: "NHL"})
    }).then(res => {return res.json()}).then((data:PlayerOdds[]) =>{
      console.log(data); setBetData(data);}).catch(err => console.log(err));
  }
  useEffect(() => {callApi();},[])

  return (
    <Container maxWidth="lg">
      <div>
        Date: 12/12
      </div>
      <HotTable
      data={betData}
      height="auto"
      width="auto"
      colHeaders={["Prop","Player","Team","Projection","O/U Line","Difference","Play","Odds"]}
      columns={[
        {
          data: 'Prop',
          editor: false
        },
        {
          data: 'Player',
          editor: false
        },
        {
          data: 'Team',
          editor: false
        },
        {
          data: 'Projection',
          editor: false,
          type: 'numeric'
        },
        {
          data: 'O/U Line',
          editor: false,
          type: 'numeric'
        },
        {
          data: 'Difference',
          editor: false,
          type: 'numeric'
        },
        {
          data: 'Play',
          editor: false
        },
        {
          data: 'Odds',
          editor: false,
          type: 'numeric'
        }
      ]}
      licenseKey="non-commercial-and-evaluation"
      columnSorting={true}

      // dropdownMenu={true}
      dropdownMenu={['filter_by_condition', 'filter_by_value', 'filter_action_bar']}

      filters={true}
      editor={false}
    />
      {/* <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell>Player</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>Prop</TableCell>
              <TableCell>Projection</TableCell>
              <TableCell>O/U Line</TableCell>
              <TableCell>Difference</TableCell>
              <TableCell>Play</TableCell>
              <TableCell>Odds (DK)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          {betData.map((list, index) => (
            <TableRow key={index}>
              <TableCell>{list.Player}</TableCell>
              <TableCell>{list.Team}</TableCell>
              <TableCell>{list.Prop}</TableCell>
              <TableCell>{list.Projection}</TableCell>
              <TableCell>{list["O/U Line"]}</TableCell>
              <TableCell>{list.Difference}</TableCell>
              <TableCell><b>{list.Play}</b></TableCell>
              <TableCell>{list.Odds}</TableCell>
            </TableRow>
          ))}
          </TableBody>
        </Table>
      </TableContainer> */}
    </Container>

  );
}