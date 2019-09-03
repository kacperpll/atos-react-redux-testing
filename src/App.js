import React from 'react';
import './App.css';

const calculateData = (all = true) => {
  const data = []
  for (var i =0; i < 100; i++){
    data.push( Math.random() )
  }
  if(!all){
    data = data.filter(e=>e>0.5)
  }
  return data.reduce((sum, i) => sum + i)
}

function App({ all = true}) {
  const sum = calculateData()
  return (
    <div className="App">
      elo: {sum}
    </div>
  );
}

export default App;
