export interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}
export interface ISysReqProps {
    sysReq: string
}

export interface ISysReqItemsProps {
    activeTab : number,
    sysReq : string ,
    type : string
}