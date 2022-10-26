function matches<S extends T, T = unknown>(e: T, predicate: ((e: T) => e is S)): S | false {
    return predicate(e) ? e : false;
}

const formatter = new Intl.NumberFormat('en-US', {
    currency: 'USD',
});

const priceFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
});

export { matches, formatter, priceFormatter };