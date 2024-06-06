
interface INAVIGATION_POINT  {
    name: string
    path: string
}
export const NAVIGATION_POINT: INAVIGATION_POINT[] = [{
    name: "GAMES",
    path: "/games"
}, {
    name: "LIBRARY",
    path: "/profile"
} , {
    name: "SALES",
    path: "/games?title=&sort=discount,desc"
}];
export const SPACING = "120px";
