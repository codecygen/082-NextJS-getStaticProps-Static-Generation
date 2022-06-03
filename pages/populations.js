// NextJS-Client-Side-Data-Fetching

import { useEffect, useState } from "react";

const Populations = () => {
    const [populations, setPopulations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://datausa.io/api/data?drilldowns=Nation&measures=Population')
            .then(res => res.json())
            .then(data => {
                const allPopulations = [];

                data.data.map(data => allPopulations.push(data.Population));

                setPopulations(allPopulations);
                setIsLoading(false);
            }).catch(err => console.log(err));
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    // This section is needed otherwise, map code line
    // down below to get variable "populationList" is not
    // filled with data and it says 
    // TypeError: Cannot read property 'map' of undefined
    // This section lets the code wait until populations
    // hook is filled with data.
    if (!populations) {
        return <p>No data yet!</p>
    }

    const populationList = populations.map(population => (
        <li key={population}>{population}</li>
    ));

    return (
        <ul>{populationList}</ul>
    );
};

export default Populations;