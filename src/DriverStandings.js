import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DriverStandings = () => {
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                setLoading(true);
                const currentYear = new Date().getFullYear();
                const response = await axios.get(`https://ergast.com/api/f1/${currentYear}/driverStandings.json`);
                const driverData = response.data.MRData.StandingsTable.StandingsLists[0].DriverStandings;
                setDrivers(driverData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching driver data:', error);
                setError(true);
                setLoading(false);
            }
        };

        fetchDrivers();
    }, []);

    const renderDriverInfo = (driver, index) => {
        return (
            <div className="box driver-box" key={index}>
                <h3>{driver.Driver.givenName} {driver.Driver.familyName} - {driver.Constructors[0].name}</h3>
                <p>Position: {driver.position}</p>
                <p>Points: {driver.points}</p>
                <p>Nationality: {driver.Driver.nationality}</p>
            </div>
        );
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>API loading error</div>;

    return (
        <div>
            <h2>Driver Standings</h2>
            {drivers.map((driver, index) => renderDriverInfo(driver, index))}
        </div>
    );
};

export default DriverStandings;