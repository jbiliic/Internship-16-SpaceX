import type { Ship } from '../types/ship';
import { useCallback, useEffect, useRef, useState } from 'react';
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
    }, [debouncedSearch]);

    const fetchShips = useCallback(async (pageToFetch: number) => {
        if (shipLoading) return;
        setShipLoading(true);

        const [res, err] = await client.post('ships/query', {
            options: {
                page: pageToFetch,
                limit: 10,
            },
            query: {
                name: {
                    $regex: debouncedSearch || '',
                    $options: 'i'
                }
            }
        });

        if (err) {
            setShipError(err);
        } else if (res) {
            setShips(prev => pageToFetch === 1 ? res.docs : [...prev, ...res.docs]);
            setHasMore(res.hasNextPage);
        }
        setShipLoading(false);
    }, [debouncedSearch]);

    useEffect(() => {
        fetchShips(currentPage);
    }, [currentPage, fetchShips]);

    useEffect(() => {
        if (isAtBottom && !shipLoading && hasMore) {
            setCurrentPage(prev => prev + 1);
        }
    }, [isAtBottom, shipLoading, hasMore]);

    return { ships, shipError, shipLoading, searchQuery, setSearchQuery, ref };
};