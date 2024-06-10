import { useQuery } from "@tanstack/react-query";

const mockData = {
  aiResponse:
    "Mount & Blade II: Bannerlord (42): A great RPG game with coop mode where you can create your own character and explore the vast world.\nARK: Survival Ascended (66): If you enjoy survival games with RPG elements, this game is for you! Invite your friends and try to survive in the world of dinosaurs. \nThe Elder Scrolls® Online (68):  A very popular MMORPG, that you can play with your friends. \nSea of Thieves 2023 Edition (76): It's a great pirate adventure game that you can enjoy with your friends, completing quests and exploring the seas.\nDivinity: Original Sin 2 (id): This game is known for its deep RPG mechanics and engaging coop gameplay, making it a popular choice for RPG enthusiasts. \n",
};

const getResponseFromGemini = async (text: string) => {


  return text &&  fetch(`${process.env.NEXT_PUBLIC_BACKEND?.replace("/api/v1", "")}chat/${text}`).then((res) => res.json());
};

export const useGetResponseFromGemini = (visible: boolean, text: string) => {
  return useQuery({
    queryKey: ["ai", visible],
    queryFn: () => getResponseFromGemini(text),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    staleTime: 0,
  });
};
