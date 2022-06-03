import { useEffect, useState } from "react";

const LastSalesPage = () => {
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

    const populationList = populations.map(population => (
        <li key={population}>{population}</li>
    ));

    return (
        <ul>{populationList}</ul>
    );
};

export default LastSalesPage;