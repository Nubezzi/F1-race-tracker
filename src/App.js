import React from 'react';
import RaceResults from './RaceResults';
import DriverStandings from './DriverStandings';
import NextRace from './NextRace';
import './App.css'; // Import the CSS file


const App = () => {

  return (
    <div className="App">
      <NextRace />
      <div className="container">
        <RaceResults />
        <DriverStandings />
      </div>
    </div>
  );
}

export default App;