const obj = {}
export const setVal = (k, v) => {
    obj[k] = v;
}
export const getVal = (k) => {
    return obj[k];
}
export const getValOnceAndReset = (k) => {
    const temp = obj[k];
    obj[k] = undefined;
    return temp;
}