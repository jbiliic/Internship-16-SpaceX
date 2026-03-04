import { useEffect, useState, type RefObject } from 'react';

interface UseIntersectionObserverProps {
    root?: Element | null;
    rootMargin?: string;
    threshold?: number | number[];
}

export function useIsAtBottom(
    elementRef: RefObject<Element | null>,
    { threshold = 0.1, root = null, rootMargin = '0% 0% 200px 0%' }: UseIntersectionObserverProps = {}
): boolean {
    const [isAtBottom, setIsAtBottom] = useState<boolean>(false);

    useEffect(() => {
        const node = elementRef?.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsAtBottom(entry.isIntersecting);
            },
            { threshold, root, rootMargin }
        );
        observer.observe(node);

        return () => observer.disconnect();
    }, [elementRef, threshold, root, rootMargin]);

    return isAtBottom;
}