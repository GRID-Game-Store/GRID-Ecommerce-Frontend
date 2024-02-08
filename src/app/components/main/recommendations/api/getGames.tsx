export const getGamesOfferByTab = async (tab: string) =>  {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}games/offers?query=${tab}&qty=5`)
    const game = res.json()
    return game;
}
export const getGameFullInfo = async (activeHover: number) =>  {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}games/${activeHover}`)
    const game = res.json()
    return game;
}
