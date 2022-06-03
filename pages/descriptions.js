// React-Simple-Vercel-Hook-Stale-While-Revalidate-SWR

import { useEffect, useState } from "react";

const Descriptions = () => {
    const [descriptions, setDescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://api.publicapis.org/entries')
            .then(res => res.json())
            .then(data => {
                const allDescriptions = [];

                data.entries.map(entry => allDescriptions.push(entry.Description));

                setDescriptions(allDescriptions);
                setIsLoading(false);
            }).catch(err => console.log(err));
    }, []);

    if (isLoading) {
        return <p>Loading...</p>
    }

    if (!descriptions) {
        return <p>No data yet!</p>
    }

    const descriptionList = descriptions.map(description => (
        <li key={description}>{description}</li>
    ));

    return (
        <ul>{descriptionList}</ul>
    );
};

export default Descriptions;