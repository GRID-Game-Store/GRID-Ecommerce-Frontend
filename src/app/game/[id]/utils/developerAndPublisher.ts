import { FullInfoResponse } from "@/app/types/types";


export const getDeveloperAndPublisher = (fullInfo: FullInfoResponse) => {
    if (fullInfo) {
        const { developer, publisher } = fullInfo
        const isMatchDeveloperAndPublisher = developer.name === publisher.name
        if (isMatchDeveloperAndPublisher) {
            return developer.name;
        } else {
            return `${developer.name} & ${publisher.name}`
        }
    } else {
        return ''
    }
    
}