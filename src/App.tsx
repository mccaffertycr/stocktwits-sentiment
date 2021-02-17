import React from 'react';
import { Search } from './Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <Search />
      <p style={{ fontSize: 10 }}>data from <a href="https://api.stocktwits.com/developers">https://api.stocktwits.com/developers</a></p>
    </div>
  );
}

export default App;
