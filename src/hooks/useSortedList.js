import { useMemo } from "react";

const useSortedList = (list, sort) => {

    const compare = (x, y, reverse = false) => {
        const [a, b] = (reverse) ? [x,y] : [y,x];
        return (typeof a === 'string' && typeof b === 'string')
            ? a.localeCompare(b)
            : a - b;
    }

    const swapItems = (array, ind) => {
        return array.map( (val, i) => 
            (i === ind.a)
                ? list[ind.b]
                : (i === ind.b)
                    ? list[ind.a]
                    : val)   
    }

    const sortedList = useMemo( () => {
        return (sort.value)
            ? [...list].sort( (a,b) => compare(a[sort.value], b[sort.value], sort.reverse) )
            : list
    }, [list, sort]);

    return sortedList;
}

export default useSortedList;