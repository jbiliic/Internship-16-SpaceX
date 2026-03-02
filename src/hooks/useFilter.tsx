import { useState, useMemo, useEffect } from "react";
import { useDebounce } from 'use-debounce'; 

export const useFilteredObjects= <T extends { name: string; success?: boolean; upcoming?: boolean }>(objects: T[],needsFiltering?: boolean) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [isSuccessful,setIsSuccessful] = useState<boolean | null>(null);
    const [isUpcoming, setIsUpcoming] = useState<boolean | null>(null);
    const [debouncedSearch] = useDebounce(searchQuery, 300);
    const [isFiltering, setIsFiltering] = useState(false);

    useEffect(() => {
        if (searchQuery !== debouncedSearch) {
            setIsFiltering(true);
        } else {
            setIsFiltering(false);
        }
    }, [searchQuery, debouncedSearch]);

    const filteredObjects = useMemo(() => {
        if (!objects) return [];
        const filtered = objects
            .filter((obj) => {
                const matchesSearch = obj.name
                    .toLowerCase()
                    .includes(debouncedSearch.toLowerCase());
                return matchesSearch;
            })

        if(!needsFiltering) return filtered;

        return filtered.filter(obj => {
            if(isSuccessful === null) return true;
            return obj.success === isSuccessful;

            }).filter(obj => {
                if(isUpcoming === null) return true;
                return obj.upcoming === isUpcoming;
            });

    }, [objects, debouncedSearch, isSuccessful, isUpcoming]);

    return {
        searchQuery,
        setSearchQuery,
        filteredObjects,
        isFiltering,
        setIsSuccessful,
        setIsUpcoming,
    };
};