import { Main } from "@/app/components/main/main";
import { ResponseGamePopular } from "@/app/components/main/types/Response";
import {
  getAllByLabelText,
  getByLabelText,
  getByText,
  render,
  screen,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import { MostPopular } from "@/app/components/main/slider/slider";
export const mockSlides: Array<ResponseGamePopular> = [
  {
    id: 9,
    title: "Dead by Daylight",
    description:
      "Dead by Daylight is a multiplayer (4vs1) horror game where one player takes on the role of the savage Killer, and the other four players play as Survivors, trying to escape the Killer and avoid being caught and killed.",
    price: 228.15,
    cover_image_url:
      "https://cdn.cloudflare.steamstatic.comsteamapps381210/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 1,
        name: "Action",
      },
    ],
    platforms: [
      {
        id: 1,
        name: "Windows",
      },
    ],
  },
  {
    id: 121,
    title: "Assetto Corsa",
    description:
      'Assetto Corsa v1.16 introduces the new "Laguna Seca" laser-scanned track, 7 new cars among which the eagerly awaited Alfa Romeo Giulia Quadrifoglio! Check the changelog for further info!',
    price: 256.5,
    cover_image_url:
      "https://cdn.cloudflare.steamstatic.comsteamapps244210/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 3,
        name: "Simulation",
      },
      {
        id: 10,
        name: "Racing",
      },
      {
        id: 7,
        name: "Indie",
      },
      {
        id: 4,
        name: "Sports",
      },
    ],
    platforms: [
      {
        id: 1,
        name: "Windows",
      },
    ],
  },
  {
    id: 86,
    title: "Destiny 2",
    description:
      "Destiny 2 is an action MMO with a single evolving world that you and your friends can join anytime, anywhere, absolutely free.",
    price: 2000,
    cover_image_url:
      "https://cdn.cloudflare.steamstatic.comsteamapps1085660/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 2,
        name: "Adventure",
      },
      {
        id: 6,
        name: "Free to Play",
      },
    ],
    platforms: [
      {
        id: 1,
        name: "Windows",
      },
    ],
  },
  {
    id: 127,
    title: "DAVE THE DIVER",
    description:
      "DAVE THE DIVER is a casual, singleplayer adventure RPG featuring deep-sea exploration and fishing during the day and sushi restaurant management at night. Join Dave and his quirky friends as they seek to uncover the secrets of the mysterious Blue Hole.",
    price: 256.5,
    cover_image_url:
      "https://cdn.cloudflare.steamstatic.comsteamapps1868140/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 3,
        name: "Simulation",
      },
      {
        id: 7,
        name: "Indie",
      },
      {
        id: 9,
        name: "RPG",
      },
      {
        id: 12,
        name: "Casual",
      },
      {
        id: 2,
        name: "Adventure",
      },
    ],
    platforms: [
      {
        id: 1,
        name: "Windows",
      },
      {
        id: 2,
        name: "macOS",
      },
    ],
  },
  {
    id: 35,
    title: "ELDEN RING",
    description:
      "THE NEW FANTASY ACTION RPG. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
    price: 1348.65,
    cover_image_url:
      "https://cdn.cloudflare.steamstatic.comsteamapps1245620/capsule_616x353.jpg?t=1692054815",
    genres: [
      {
        id: 1,
        name: "Action",
      },
      {
        id: 9,
        name: "RPG",
      },
    ],
    platforms: [
      {
        id: 1,
        name: "Windows",
      },
    ],
  },
];

describe("Test component Main on minimal functional ", () => {
  it("check main information in main page slider component", () => {
    const { container } = render(<MostPopular slides={mockSlides} />);
    expect(getByText(container, mockSlides[0].title)).toBeInTheDocument();

    expect(getByText(container, mockSlides[0].description)).toBeInTheDocument();
    expect(
      getByText(container, mockSlides[0].genres[0].name),
    ).toBeInTheDocument();
  });
  it("check amount navigations dots for slider", () => {
    const { container } = render(<MostPopular slides={mockSlides} />);
    expect(getAllByLabelText(container, "navigation dots").length).toBe(5);
  });
});
