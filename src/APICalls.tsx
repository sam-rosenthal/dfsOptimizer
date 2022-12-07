import dayjs from "dayjs";
import { LineUp } from "./Types";

export async function getPlayerList(sport: string, d: dayjs.Dayjs | null, setPlayerList: { (value: React.SetStateAction<string[]>): void; (arg0: string[]): void; })  {
  const date = getDate(d);
  console.log("Calling getPlayerList with date="+date);
  fetch('/DFSPlayerList',{
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ sport: sport,date: date})
  }).then(
    res => {return res.json()}).then((data) =>{
      const x = JSON.parse(data);
      console.log("getPlayerList returned: "+JSON.stringify(x));
      const playerNames:string[]= Object.values(x);
      console.log(playerNames);
      setPlayerList(playerNames)
  }).catch(err => console.log(err));
}

export async function getOptialLineup(coreList: string[] | null | undefined, d: dayjs.Dayjs | null, site: string, sport: string, setOptLineup: { (value: React.SetStateAction<LineUp| null | undefined>): void; (arg0: LineUp): void; }){
  console.log("Calling getOptialLineup. "+ JSON.stringify({ core: coreList}));
  const date = getDate(d);
  fetch('/DFSData', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ core: coreList, date: date, site: site, sport: sport})
  }).then(
    res => { return res.json()}).then((data) =>{
    const x:LineUp = JSON.parse(data);
    console.log("Output of getOptialLineup: "+JSON.stringify(x));
    console.log(typeof x)
    setOptLineup(x);
  }).catch(err => console.log(err));
}

function getDate(d: dayjs.Dayjs | null) {
  const current = new Date();
  let date:string = ""+(current.getMonth()+1) +"-"+ current.getDate();
  if(d !== null){
    date = d.format("MM-DD");
  }
  return date;
}