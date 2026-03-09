import { mapShip, type Ship } from '../types/ship';
import { useEffect, useRef, useState } from 'react';
import { useIsAtBottom } from './useIsAtBottom';
import client from '../api/client.ts';
import { useSearchParams } from 'react-router-dom';
import { useDebounce } from 'use-debounce';

export const useFetchShips = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
    const [debouncedSearch] = useDebounce(searchQuery, 300);

    const [ships, setShips] = useState<Ship[]>([]);
    const [shipError, setShipError] = useState<string | null>(null);
    const [shipLoading, setShipLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const ref = useRef<HTMLDivElement>(null);
    const isAtBottom = useIsAtBottom(ref);

    useEffect(() => {
        const params = new URLSearchParams(searchParams);
        if (debouncedSearch) {
            params.set("search", debouncedSearch);
        } else {
            params.delete("search");
        }
        setSearchParams(params, { replace: true });
        setShips([]);
        setCurrentPage(1);
        setHasMore(true);
    }, [debouncedSearch, setSearchParams]);

    useEffect(() => {
        let isCurrentRequest = true;

        const performFetch = async () => {
            setShipLoading(true);
            console.log(`Fetching ships with search: "${debouncedSearch}", page: ${currentPage}`);
            const [res, err] = await client.post('/ships/query', {
                options: {
                    page: currentPage,
                    limit: 10,
                },
                query: {
                    name: {
                        $regex: debouncedSearch.trim() || '',
                        $options: 'i'
                    }
                }
            });

            if (!isCurrentRequest) return;

            if (err) {
                setShipError(err);
            } else if (res) {
                const mappedShips = res.docs.map(mapShip);
                setShips(prev => currentPage === 1 ? mappedShips : [...prev, ...mappedShips]);
                setHasMore(res.hasNextPage);
            }
            setShipLoading(false);
        };

        performFetch();

        return () => {
            isCurrentRequest = false;
        };
    }, [currentPage, debouncedSearch]);

    useEffect(() => {
        if (isAtBottom && !shipLoading && hasMore && ships.length >= 10) {
            setCurrentPage(prev => prev + 1);
        }
    }, [isAtBottom, shipLoading, hasMore, ships.length]);

    return { ships, shipError, shipLoading, searchQuery, setSearchQuery, ref, hasMore };
}; 