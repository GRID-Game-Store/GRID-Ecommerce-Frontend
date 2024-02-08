import { getGamesByTitle } from "../search"




const mockList = [
    {
      "id": 7,
      "title": "Baldurs Gate 3",
      "description": "Baldur’s Gate 3 is a story-rich, party-based RPG set in the universe of Dungeons &amp; Dragons, where your choices shape a tale of fellowship and betrayal, survival and sacrifice, and the lure of absolute power.",
      "price": 1078.65,
      "cover_image_url": "https://cdn.cloudflare.steamstatic.com/steam/apps/1086940/header.jpg?t=1696948801",
      "genres": [
        {
          "id": 2,
          "name": "Adventure"
        },
        {
          "id": 5,
          "name": "Strategy"
        }
      ]
    }
  ]



describe('Test search ', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
        json: () => Promise.resolve(mockList),
        })
    ) as jest.Mock

    
    it('Test getGamesByTitle ', async () => {
      const data = await getGamesByTitle("test")
      expect(data).toEqual(mockList)

    })
   
    
})

