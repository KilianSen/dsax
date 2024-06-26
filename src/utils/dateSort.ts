export function sortByDate<X>(arr: Array<X>, elementDate?: (el: X) => Date) {

    if (!elementDate) {
        elementDate = (el: X) => (el as unknown as {date: Date}).date;
    }

    return arr.sort(function(a: X, b: X){
        const eB = elementDate(b);
        const eA = elementDate(a);

        // FIXME: What the hell is even going on at this point? This is a mess.

        if (eB["getTime"] === undefined || eA["getTime"] === undefined) {
            return (elementDate(b) as unknown as number - (elementDate(a) as unknown as number));
        }
        return (elementDate(b).getTime() - elementDate(a).getTime());
    });
}