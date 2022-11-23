import dayjs from "dayjs";
import { Player, LineUp, LineUp2 } from "./Types";

export async function getPlayerList(d: dayjs.Dayjs | null, setPlayerList: { (value: React.SetStateAction<Player[]>): void; (arg0: Player[]): void; })  {
  const date = getDate(d);
  console.log("Calling getPlayerList with date="+date);
  fetch('/DFSPlayerList',{
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ date: date})
  }).then(
    res => {return res.json()}).then((data) =>{
      const x = JSON.parse(data);
      console.log("getPlayerList returned: "+JSON.stringify(x));
      const players:Array<Player> = Object.values(x);
      setPlayerList(players)
  }).catch(err => console.log(err));
}

export async function getOptialLineup(coreList: string[] | null | undefined, d: dayjs.Dayjs | null, site: string, setOptLineup: { (value: React.SetStateAction<LineUp | LineUp2 | null | undefined>): void; (arg0: LineUp| LineUp2): void; }){
  console.log("Calling getOptialLineup. "+ JSON.stringify({ core: coreList}));
  const date = getDate(d);
  fetch('/DFSData', {
    method: 'POST', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ core: coreList, date: date, site: site})
  }).then(
    res => { return res.json()}).then((data) =>{
    console.log("Output of getOptialLineup: "+data);
    setOptLineup(data);
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