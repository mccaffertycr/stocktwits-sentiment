import React from 'react';
import { PillGraph } from './PillGraph';
import { postedAgo } from './helpers/postedAgo';
import './Search.css';


export const Search = () => {
  const [data, setData] = React.useState<any>(null);
  const [input, setInput] = React.useState('');

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (input) {
      try {
        const response = await fetch(`https://api.stocktwits.com/api/2/streams/symbol/${input}.json`, { mode: 'no-cors' });
        const result: any = await response.json();
   
        if (result) {
          let sentiment = result.messages.map((msg: { entities: { sentiment: any; }; }) => msg = msg.entities.sentiment);
          let bearish = 0;
          let bullish = 0;
          let lastCreated = result.messages[result.messages.length - 1].created_at;
          lastCreated = new Date(lastCreated).getTime().toString();
          let _lastCreated = postedAgo(lastCreated);

          sentiment.forEach((ele: { basic: string; } | null) => {
            if (ele === null) return;
            if (ele.basic === 'Bearish') bearish = bearish + 1;
            if (ele.basic === 'Bullish') bullish = bullish + 1;
          });

          const newData = { 
            volume: result.messages.length,
            lastCreated: _lastCreated,
            bearish: (bearish / sentiment.length).toFixed(2), 
            bullish: (bullish / sentiment.length).toFixed(2) 
          };
          setData(newData);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      return console.log('no input');
    }
  }

  const handleChange = async (e: any) => {
    e.preventDefault();

    setInput(e.target.value)
  }

  return (
    <>
      <form id="search-form">
        <input type="text" placeholder="symbol" onChange={handleChange} />
        <button id="search-btn" type="submit" onClick={handleSubmit}>🔍</button>
      </form>
      {data
        ? (
          <>
            <PillGraph bearish={data.bearish} bullish={data.bullish} />
            <p>{`last ${data.volume} stocktwits as of ${data.lastCreated}`}</p>
          </>
          )
        : null
      }
    </>
  )
}