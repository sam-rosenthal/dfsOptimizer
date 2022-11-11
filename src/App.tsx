import React from 'react';
import logo from './logo.svg';
import './App.css';
import Tags from './tags';
import { Container, CssBaseline } from '@mui/material';

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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={callApi}>Call API</button>
      </header> */}
      <CssBaseline />
      <Container maxWidth="md">
        <Tags/>
      </Container>

     </div>
  );
}

export default App;
