// NextJS-Client-Side-Data-Fetching
// React-Simple-Vercel-Hook-Stale-While-Revalidate-SWR
// For a new project, if you need to install SWR (Stale-While-Revalidate) write command
// - npm i swr

// The name “SWR” is derived from stale-while-revalidate, 
// a HTTP cache invalidation strategy popularized by 
// HTTP RFC 5861. SWR is a strategy to first return the 
// data from cache (stale), then send the fetch request (revalidate), 
// and finally come with the up-to-date data.

import { useEffect, useState } from "react";
import useSWR from 'swr';

const Descriptions = () => {
    const [descriptions, setDescriptions] = useState([]);

    const fetchLink = 'https://api.publicapis.org/entries';

    const fetcher = (url) => fetch(url).then(res => res.json());

    const { data, error } = useSWR(fetchLink, fetcher);

    useEffect(() => {
        const allDescriptions = [];
        if (data) {
            data.entries.map(entry => allDescriptions.push(entry.Description));
        }

        setDescriptions(allDescriptions);
    }, [data]);

    if (error) {
        return <p>Failed to load!</p>
    }

    if (!data || !descriptions) {
        return <p>Loading...</p>
    }

    const descriptionList = descriptions.map(description => (
        <li key={description}>{description}</li>
    ));

    return (
        <ul>{descriptionList}</ul>
    );
};

export default Descriptions;