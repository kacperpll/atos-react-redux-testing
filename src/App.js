import React from 'react';
import './App.css';

const calculateData = (all = true) => {
  let data = []
  for (var i =0; i < 100; i++){
    data.push( Math.random() )
  }
  if(!all){
    data = data.filter(e=>e>0.5)
  }
  return data.reduce((sum, i) => sum + i)
}

function App({ all = true}) {
  const sum1 = calculateData()
  const sum2 = calculateData(all)
  return (
    <div className="App">
      elo: {sum1} {sum2}
    </div>
  );
}

export default App;
