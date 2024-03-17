

export const getMargins = (matches: boolean) => {
    const ml = matches ? "20px" : "5px"
    const mr = matches ? "0px" : "5px"
    const mt = matches ? "0px" : "20px"
    return {
        ml,
        mr,
        mt
    }
}