import { useEffect, useState } from "react";
import client from '../api/client.ts';
import type { Landing } from '../types/landings.ts';
import { mapLanding } from "../types/landings.ts";
interface FetchLandingsProps {
    page?: number;
}

export const useFetchLandings = (props?: FetchLandingsProps) => {
    const [currentPage, setCurrentPage] = useState<number>(() => {
        const storedPage = localStorage.getItem('currentPage');
        return props?.page || (storedPage ? parseInt(storedPage, 10) : 1);
    });
    const [landingsData, setLandingsData] = useState<Landing[]>([]);
    const [landingsError, setLandingsError] = useState<string | null>(null);
    const [landingsLoading, setLandingsLoading] = useState<boolean>(false);

    const fetchLandings = async () => {
        setLandingsLoading(true);
        const [res, err] = await client.post('/launches/query',
            {
                options: {
                    page: currentPage
                }
            }
        );
        if (err) {
            setLandingsError(err);
        } else {
            console.log(res);
            setLandingsData(res.docs.map((data: any) => mapLanding(data)));
        }
        setLandingsLoading(false);
    };
    useEffect(() => {
        localStorage.setItem('currentPage', String(currentPage));
        fetchLandings();
    }, [currentPage]);

    return { landingsData, landingsError, landingsLoading, currentPage, setCurrentPage };
}