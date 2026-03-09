import client from '../api/client.ts';
import { useEffect, useState } from 'react';
import { mapRocket, type Rocket } from '../types/rocket.ts';

export const useFetchRocket = (id: string) => {
    const [rocketData, setRocketData] = useState<Rocket | null>(null);
    const [rocketError, setRocketError] = useState<string | null>(null);
    const [rocketLoading, setRocketLoading] = useState<boolean>(false);

    const fetchRocketData = async () => {
        setRocketLoading(true);
        const [data, error] = await client.get(`/rockets/${id}`);
        if (error) {
            setRocketError(error);
            setRocketData(null);
        } else {
            setRocketData(mapRocket(data));
            setRocketError(null);
        }
        setRocketLoading(false);
    };
    useEffect(() => {
        fetchRocketData();
    }, []);
    return { rocketData, rocketError, rocketLoading };
}