import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { LineUp, PlayerProj } from './Types';
// import { DataGrid, GridColDef } from '@mui/x-data-grid';


interface Props {
  OptLineUp: LineUp | null | undefined;
}
// type Output = 
// {id: number,Position: string, Name: string, Salary: number, Projection: number}


function xxx(OptLineUp: LineUp | null | undefined) {
  console.log("OptLineup="+JSON.stringify(OptLineUp));
  if (OptLineUp == null) {
    return <TableRow></TableRow>;
  }
  const yyy: JSX.Element[] = [];
  let projectedTotal = 0;

  Object.entries(OptLineUp).forEach((x) => {
  const position = x[0];
  const players:PlayerProj[] = x[1];
  players.forEach((player:PlayerProj) =>{
    projectedTotal += player.Projection;
    const x = 
      <TableRow
        key={player.Name}
        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
      >
        <TableCell component="th" scope="row">
        {position}
        </TableCell>
        <TableCell align="right">{player.Name}</TableCell>
        <TableCell align="right">${player.Salary}</TableCell>
        <TableCell align="right">{player.Projection}</TableCell>
      </TableRow>;
        yyy.push(x);
      });
      });
    yyy.push(<TableRow
      key="TotalProjected"
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row"/>       
      <TableCell align="right"></TableCell>
      <TableCell align="right"></TableCell>
      <TableCell align="right"><b>Total Projected: {projectedTotal.toFixed(2)}</b></TableCell>
    </TableRow>);
    return yyy;
}

// function getRows(OptLineUp: LineUp | null | undefined){
//   if(OptLineUp == null || OptLineUp == undefined){
//     return [];
//   }
//   const lineUpList:Output[] = [];
//   Object.entries(OptLineUp).forEach(x => {
//     const position = x[0];
//     const players:PlayerProj[] = x[1];
//     players.forEach((p:PlayerProj) => 
//       lineUpList.push({id: p.Projection, Position: position, Name: p.Name, Salary: p.Salary, Projection: p.Projection}));
//     return lineUpList;
//   });
//   console.log("AAA"+JSON.stringify(lineUpList));
//   return lineUpList;
// }

// const columns: GridColDef[] = [
//   { field: 'Position', headerName: 'Position', width: 90 },
//   { field: 'Name', headerName: 'Name', width: 90 },
//   { field: 'Salary', headerName: 'Salary', width: 90 },
//   { field: 'Projection', headerName: 'Projection', width: 90 },
// ]


export default function BasicTable(props: Props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Position</TableCell>
            <TableCell align="right">Player</TableCell>
            <TableCell align="right">Salary</TableCell>
            <TableCell align="right">Projection</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {xxx(props.OptLineUp)}
             {/* <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          )})} */}
        </TableBody>
      </Table>
    </TableContainer>
    // <div style={{ height: 400, width: '100%' }}>
    //   <DataGrid
    //   rows={getRows(props.OptLineUp)}
    //   columns={columns}
    // />
    // </div>
  );
}