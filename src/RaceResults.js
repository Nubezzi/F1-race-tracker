import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const RaceResults = () => {
    const [races, setRaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRaces = async () => {
            try {
                setLoading(true);
                const currentYear = new Date().getFullYear();
                const response = await axios.get(`https://ergast.com/api/f1/${currentYear}.json`);
                const raceData = response.data.MRData.RaceTable.Races;
                setRaces(raceData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching race data:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchRaces();
    }, []);

    const hasRaceHappened = (raceDate) => {
        return new Date(raceDate) < new Date();
    };

    const renderRaceInfo = (race) => {
        return (
            <div className="box race-box" key={race.round}>
                <h3>{race.raceName}</h3>
                <p>Date: {moment(race.date).format('DD MMMM YYYY')}</p>
                <p>Location: {race.Circuit.circuitName}, {race.Circuit.Location.locality}, {race.Circuit.Location.country}</p>
                {hasRaceHappened(race.date) && <RaceResultDetails raceId={race.round} />}
            </div>
        );
    };

    return (
        <div>
            <h2>Race Results</h2>
            {loading && <div>Loading...</div>}
            {error && <div>API loading error</div>}
            {races.map(race => renderRaceInfo(race))}
        </div>
    );
};

const RaceResultDetails = ({ raceId }) => {
    const [raceResults, setRaceResults] = useState(null);

    useEffect(() => {
        const fetchRaceResults = async () => {
            const currentYear = new Date().getFullYear();
            const response = await axios.get(`https://ergast.com/api/f1/${currentYear}/${raceId}/results.json`);
            const resultsData = response.data.MRData.RaceTable.Races[0].Results;
            setRaceResults(resultsData);
        };

        fetchRaceResults();
    }, [raceId]);

    if (!raceResults) return <div>Loading race details...</div>;

    // Filter to show only the top 3 positions
    const topThreeResults = raceResults.filter(result => ['1', '2', '3'].includes(result.position));

    return (
        <div>
            <h4>Top 3 Finishers:</h4>
            {topThreeResults.map((result, index) => (
                <p key={index}>{result.position}: {result.Driver.givenName} {result.Driver.familyName} ({result.Constructor.name})</p>
            ))}
        </div>
    );
};

export default RaceResults;
