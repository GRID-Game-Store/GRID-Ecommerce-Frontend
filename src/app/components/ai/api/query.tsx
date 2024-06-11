import { useQuery } from "@tanstack/react-query";

const getResponseFromGemini = async (text: string) => {
  if (text) {
    const res = await fetch(`/api/chat/${text}`);
    const resAI = await res.json();
    return resAI.data;
  } else {
    return null;
  }
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
