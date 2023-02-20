import { Suspense } from 'react';
import './App.css';
import { Container, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Components/Nav/NavBar';
import DFS from './Components/DFS/DFS';
import BetsTable from './Components/Betting/Bets';


type Position = string;
type Players = Array<string>;
type Lineup = Map<Position,Players>;

async function callApi()  {
  fetch('/DFS', { 
    method: 'POST', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Dan', age:'21', spec: 'biology' })
    }
    ).then(
    res => {console.log(res);return res.json()}).then((data:Lineup) =>{
      console.log(data);
      console.log(typeof(data));
      data.forEach((v,k) => console.log(k +" "+v+"SSSSS"));
    alert(JSON.stringify(data));
  }).catch(err => console.log(err));
}





function App() {

  return (
    <div className="App">
      <CssBaseline />
      <Navbar/>
        <Suspense fallback={<div>Loading...</div>}>
 
          <Routes>
            <Route path ="/" element = {<DFS />} />
            <Route path ="/Betting" element = {<BetsTable />} />
          </Routes>
        </Suspense>
     </div>
  );
}

export default App;
