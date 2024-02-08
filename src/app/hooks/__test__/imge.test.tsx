import { analyzeImage, loadImage } from "../useColorFromImg";
import { setupJestCanvasMock } from 'jest-canvas-mock';



describe('the can', () => {

    beforeEach(() => {
        jest.resetAllMocks();
        setupJestCanvasMock();
      });

    it("should check Items render variant is preview", async () => {
        const img = document.createElement('img')
        img.width = 900
        img.height = 453
        img.src = "https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/capsule_616x353.jpg?t=1692054815"
        expect(analyzeImage(img)).toBe("rgba(0,0,0,0.50)")
    })

  });