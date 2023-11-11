import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';

const NextRace = () => {
    const [nextRace, setNextRace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchNextRace = async () => {
            try {
                setLoading(true);
                const currentYear = new Date().getFullYear();
                const response = await axios.get(`https://ergast.com/api/f1/${currentYear}.json`);
                const races = response.data.MRData.RaceTable.Races;
                const upcomingRaces = races.filter(race => new Date(race.date) > new Date());

                if (upcomingRaces.length > 0) {
                    setNextRace(upcomingRaces[0]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching race data:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchNextRace();
    }, []);

    const timeUntilRace = (raceDate) => {
        return moment(raceDate).fromNow();
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>API loading error</div>;
    if (!nextRace) return <div>No upcoming races found</div>;

    return (
        <div className='nextRace'>
            <h2>Next Race</h2>
            <h3>{nextRace.raceName}</h3>
            <p>Date: {moment(nextRace.date).format('DD MMMM YYYY')} ({timeUntilRace(nextRace.date)})</p>
            <p>Location: {nextRace.Circuit.circuitName}, {nextRace.Circuit.Location.locality}, {nextRace.Circuit.Location.country}</p>
        </div>
    );
};

export default NextRace;