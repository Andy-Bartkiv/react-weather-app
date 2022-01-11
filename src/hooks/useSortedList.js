import { useMemo } from "react";

const useSortedList = (list, sort) => {

    const compare = (x, y, reverse = false) => {
        const [a, b] = (reverse) ? [x,y] : [y,x];
        return (typeof a === 'string' && typeof b === 'string')
            ? a.localeCompare(b)
            : a - b;
    }

    const sortedList = useMemo( () => {
        return (sort.value)
            ? [...list].sort( (a,b) => compare(a[sort.value], b[sort.value], sort.reverse) )
            : list
    }, [sort, list]);

    return sortedList;
}

export default useSortedList;