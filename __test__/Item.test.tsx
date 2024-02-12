import { ResponseGameFullInfo, ResponseGameRandom } from "@/app/components/main/types/Response";
import { Items } from "@/app/components/shared/Item/items";
import { ItemLargePreview, ItemSmallColumn, ItemSmallColumnForSearch, ItemSmallRow } from "@/app/components/shared/Item/variants/item";
import { fireEvent, getByAltText, getByText, render, screen } from "@testing-library/react";


const gameFullInfoMock :ResponseGameFullInfo = {
    "id": 7,
    "title": "Baldurs Gate 3",
    "description": "Baldur’s Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons &amp; Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power.",
    "release_date": "02-08-2023",
    "system_requirements": "MINIMUM:  Requires a 64-bit processor and operating system  OS: Windows 10 64-bit  Processor: Intel I5 4690 / AMD FX 8350  Memory: 8 GB RAM  Graphics: Nvidia GTX 970 / RX 480 (4GB+ of VRAM)  DirectX: Version 11  Storage: 150 GB available space  Additional Notes: SSD required RECOMMENDED:  Requires a 64-bit processor and operating system  OS: Windows 10 64-bit  Processor: Intel i7 8700K / AMD r5 3600  Memory: 16 GB RAM  Graphics: Nvidia 2060 Super / RX 5700 XT (8GB+ of VRAM)  DirectX: Version 11  Storage: 150 GB available space  Additional Notes: SSD required",
    "price": 1078.65,
    "cover_image_url": "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg?t=1696948801",
    "discount": 0,
    "permit_age": "18",
    "publisher": {
      "id": 7,
      "name": "Larian Studios"
    },
    "developer": {
      "id": 7,
      "name": "Larian Studios"
    },
    "tags": [
      {
        "id": 12,
        "name": "Multiplayer"
      },
      {
        "id": 70,
        "name": "Choices Matter"
      },
      {
        "id": 80,
        "name": "Combat"
      },
      {
        "id": 78,
        "name": "Class-Based"
      },
      {
        "id": 72,
        "name": "Turn-Based Combat"
      },
      {
        "id": 79,
        "name": "Dark Fantasy"
      },
      {
        "id": 81,
        "name": "Stealth"
      },
      {
        "id": 75,
        "name": "Fantasy"
      },
      {
        "id": 3,
        "name": "Story Rich"
      },
      {
        "id": 73,
        "name": "Dungeons & Dragons"
      },
      {
        "id": 5,
        "name": "Singleplayer"
      },
      {
        "id": 69,
        "name": "RPG"
      },
      {
        "id": 32,
        "name": "Controller"
      },
      {
        "id": 6,
        "name": "Adventure"
      },
      {
        "id": 71,
        "name": "Character Customization"
      },
      {
        "id": 42,
        "name": "Online Co-Op"
      },
      {
        "id": 74,
        "name": "CRPG"
      },
      {
        "id": 23,
        "name": "Strategy"
      },
      {
        "id": 76,
        "name": "Romance"
      },
      {
        "id": 77,
        "name": "Co-op Campaign"
      }
    ],
    "genres": [
      {
        "id": 9,
        "name": "RPG"
      },
      {
        "id": 2,
        "name": "Adventure"
      },
      {
        "id": 5,
        "name": "Strategy"
      }
    ],
    "platforms": [
      {
        "id": 1,
        "name": "Windows"
      },
      {
        "id": 2,
        "name": "macOS"
      }
    ],
    "game_media": {
      "banner_url": "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/capsule_616x353.jpg?t=1692054815",
      "screenshot_url": "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/ss_c73bc54415178c07fef85f54ee26621728c77504.600x338.jpg?t=1696948801",
      "trailer": "https://cdn.cloudflare.steamstatic.com/steam/apps/256961600/movie480_vp9.webm?t=1695393579",
      "trailer_screenshot": "https://cdn.cloudflare.steamstatic.com/steam/apps/256961600/movie.293x165.jpg?t=1695393579"
    }
  }



const gameMock: ResponseGameRandom = {
    "id": 71,
    "title": "TEKKEN 8",
    "description": "Get ready for the next chapter in the legendary fighting game franchise, TEKKEN 8.",
    "price": 0,
    "cover_image_url": "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/capsule_616x353.jpg?t=1692054815",
    "genres": [
      {
        "id": 1,
        "name": "Action"
      },
      {
        "id": 1,
        "name": "Action"
      }
    ]
  }
  const gameMockWithFreeProduct: ResponseGameRandom = {
    "id": 71,
    "title": "TEKKEN 8",
    "description": "Get ready for the next chapter in the legendary fighting game franchise, TEKKEN 8.",
    "price": 0,
    "cover_image_url": "https://cdn.cloudflare.steamstatic.com/steam/apps/1778820/capsule_616x353.jpg?t=1692054815",
    "genres": [
      {
        "id": 1,
        "name": "Action"
      },
      {
        "id": 1,
        "name": "Action"
      }
    ]
  }






  const getPrice = (data : ResponseGameRandom) => {
    return data.price || "free";
  }
describe("check all item variation", () => {
    it("should check ItemSmallRow render", () => {
        const {container} =  render(<ItemSmallRow game={gameMock}/>);
        const widthItem = "150"
        expect(container.querySelector("img")?.src).toBe(gameMock.cover_image_url);
        expect(container.querySelector("img")?.getAttribute("width")).toBe(widthItem);
        expect(container.querySelector("p")?.innerHTML).toBe(gameMock.title);
        expect(container.querySelector("span")?.innerHTML).toBe(gameMock.genres[0].name);
        expect(getByText(container, getPrice(gameMock) , { selector: 'button' })).toBeDefined()
        expect(getByText(container, getPrice(gameMockWithFreeProduct) , { selector: 'button' })).toBeDefined()
    })
    it("should check ItemSmallColumnForSearch render", () => {
        const {container} =  render(<ItemSmallColumnForSearch game={gameMock}/>);
        const widthItem = "144"
        expect(container.querySelector("img")?.src).toBe(gameMock.cover_image_url);
        expect(container.querySelector("img")?.getAttribute("width")).toBe(widthItem);
        expect(container.querySelector("p")?.innerHTML).toBe(gameMock.title);
        expect(getByText(container, getPrice(gameMock) , { selector: 'button' })).toBeDefined()
        expect(getByText(container, getPrice(gameMockWithFreeProduct) , { selector: 'button' })).toBeDefined()
    })
    it("should check ItemSmallColumn render", () => {
        const {container} =  render(<ItemSmallColumn game={gameMock}/>);
        expect(container.querySelector("img")?.src).toBe(gameMock.cover_image_url);
        expect(container.querySelector("p")?.innerHTML).toBe(gameMock.title);

    })
    it("should check ItemLargePreview render", () => {
        const {container, debug} =  render(<ItemLargePreview game={gameFullInfoMock}/>);
        expect(container.querySelector("img")?.src).toBe(gameFullInfoMock.game_media.banner_url);
        expect(container.querySelector("p")?.innerHTML).toBe(gameFullInfoMock.title);
        expect(container.querySelector("span")?.innerHTML).toBe("Singleplayer");
        fireEvent.mouseOver(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' }))
        expect(container.querySelector("video")?.src).toBe(gameFullInfoMock.game_media.trailer);
        fireEvent.mouseLeave(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' }))
        expect(container.querySelector("img")?.src).toBe(gameFullInfoMock.game_media.banner_url);
        expect(getByText(container, `Release Date : ${gameFullInfoMock.release_date}`)).toBeDefined()
        expect(getByText(container, `Developer & Publisher : Larian Studios`)).toBeDefined()
        expect(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' })).toBeDefined()
        expect(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' })).toBeDefined()

    })

    it("should check Items render default variant", () => {
        const {container, debug} =  render(<Items game={gameFullInfoMock} setActiveHover={() => console.log(1)}/>);
        expect(container.querySelector("img")?.src).toBe(gameFullInfoMock.cover_image_url);
        expect(container.querySelector("p")?.innerHTML).toBe(gameFullInfoMock.title);
        expect(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' })).toBeDefined()
        expect(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' })).toBeDefined()
    })
    it("should check Items render variant is row", () => {
        const {container, debug} =  render(<Items game={gameFullInfoMock} variant="row" setActiveHover={() => console.log(1)}/>);
        expect(container.querySelector("img")?.src).toBe(gameFullInfoMock.cover_image_url);
        expect(container.querySelector("p")?.innerHTML).toBe(gameFullInfoMock.title);
        expect(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' })).toBeDefined()
        expect(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' })).toBeDefined()
    })
    it("should check Items render variant is column", () => {
        const {container, debug} =  render(<Items game={gameFullInfoMock} variant="column" setActiveHover={() => console.log(1)}/>);
        expect(container.querySelector("img")?.src).toBe(gameFullInfoMock.cover_image_url);
        expect(container.querySelector("p")?.innerHTML).toBe(gameFullInfoMock.title);
    })

    it("should check Items render variant is preview", () => {
        const {container, debug} =  render(<Items game={gameFullInfoMock} variant="preview" setActiveHover={() => console.log(1)}/>);
        expect(container.querySelector("img")?.src).toBe(gameFullInfoMock.game_media.banner_url);
        expect(container.querySelector("p")?.innerHTML).toBe(gameFullInfoMock.title);
        expect(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' })).toBeDefined()
        expect(getByText(container, getPrice(gameFullInfoMock) , { selector: 'button' })).toBeDefined()
    })

    it("should check Items render variant is not valid", () => {
        // @ts-ignore
        const {container, debug} =  render(<Items game={gameFullInfoMock} variant="test" setActiveHover={() => console.log(1)}/>);
        expect(container.querySelector("img")?.src).toBe(undefined);
    })
    

    
})