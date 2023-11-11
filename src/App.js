// App.js

import React from 'react';
import './App.css'; // Make sure to import your CSS file
import RaceResults from './RaceResults';
import DriverStandings from './DriverStandings';
import NextRace from './NextRace';

const App = () => {
  // Function to scroll to an element
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`Element with ID '${elementId}' not found.`);
    }
  };

  return (
    <div className="App">
      <div className="sticky-top-bar">
        <h3>F1-tracker</h3>
        <button onClick={() => scrollToElement('race-results')}>Race Results</button>
        <button onClick={() => scrollToElement('driver-standings')}>Driver Standings</button>
      </div>
      <div id='next-race'>
        <NextRace />
      </div>
        
      <div className='flex-container'>
        <div id='race-results'>
          <RaceResults />
        </div>
        <div id='driver-standings'>
          <DriverStandings />
        </div>
        
      </div>
    </div>
  );
};

export default App;