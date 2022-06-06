// NextJS-Server-Side-Data-Fetching
// Both client and server side rendering can sometimes lead to the
// best possible user xp because you have some data right from the
// start and then you update it with client side React hooks.

import { useEffect, useState } from "react";
import useSWR from 'swr';

const Descriptions = (props) => {
    const [holidays, setHolidays] = useState(props.holidays);

    // This section of fetching is still needed for later adjustments
    // in database so it keeps the page up to date.
    // But the newly added line if there would be any,
    // will not be rendered in HTML source code during production
    // as it will be rendered by React rather than server side change.
    const fetchLink = 'https://date.nager.at/api/v2/publicholidays/2020/US';

    const fetcher = (url) => fetch(url).then(res => res.json());

    const { data, error } = useSWR(fetchLink, fetcher);

    useEffect(() => {
        const allHolidays = [];
        if (data) {
            data.map(entry => allHolidays.push({
                date: entry.date,
                name: entry.localName
            }));
        }

        setHolidays(allHolidays);
    }, [data]);

    if (error) {
        return <p>Failed to load!</p>
    }

    if (!data && !holidays) {
        return <p>Loading...</p>
    }

    const holidayList = holidays.map(holiday => (
        <li key={holiday.date}>{holiday.name}</li>
    ));

    return (
        <ul>{holidayList}</ul>
    );
};

export const getStaticProps = async () => {

    const fetchLink = 'https://date.nager.at/api/v2/publicholidays/2020/US';
    return fetch(fetchLink)
        .then(res => res.json())
        .then(data => {
            const allHolidays = [];

            data.map(data => allHolidays.push({
                date: data.date,
                name: data.localName
            }));

            return {
                props: {
                    holidays: allHolidays
                },

                revalidate: 10
            };
        }).catch(err => console.log(err))
    ;

    // Alternatively,
    // const fetchLink = 'https://date.nager.at/api/v2/publicholidays/2020/US';
    // const response = await fetch(fetchLink);
    // const data = await response.json();
    // const allHolidays = [];
    // data.map(data => allHolidays.push({
    //     date: data.date,
    //     name: data.localName
    // }));

    // return {
    //     props: {
    //         holidays: allHolidays
    //     },

    //     revalidate: 10
    // };
};

export default Descriptions;