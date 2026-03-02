import { useEffect, useState } from 'react';
import client from '../api/client.ts';
export const useFetchNextLaunchTime = () => {
    const [nextLaunchTime, setNextLaunchTime] = useState< string | null>(null);
    const [nextLaunchTimeError, setNextLaunchTimeError] = useState<string | null>(null);
    const [nextLaunchTimeLoading, setNextLaunchTimeLoading] = useState<boolean>(false);

    const fetchNextLaunchTime = async () => {
        setNextLaunchTimeLoading(true);
        const [data, error] = await client.get('/launches/next');
        if (error) {
            setNextLaunchTimeError(error);
            setNextLaunchTime(null);
        } else {
            setNextLaunchTime(data.date_utc);
            setNextLaunchTimeError(null);
        }
        setNextLaunchTimeLoading(false);
    };
    useEffect(() => {
        fetchNextLaunchTime();
    }, []);

    return { nextLaunchTime, nextLaunchTimeError, nextLaunchTimeLoading };
}