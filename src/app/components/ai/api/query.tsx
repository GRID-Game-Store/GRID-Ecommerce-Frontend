import { useQuery } from "@tanstack/react-query";

const getResponseFromGemini = async (text: string) => {
  const res = await fetch(`/api/chat/${text}`,)
  const resAI = await res.json();
  return resAI.data;
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
