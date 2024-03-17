import { FullInfoResponse } from "@/app/types/types";


export const getPlatforms = (platformsArray: FullInfoResponse["platforms"]) => {
    let platforms = ""
    platformsArray && platformsArray.map((platform: { name: string }) => {
        platforms += " " + platform.name.toLowerCase()
    });
    return platforms
}