import { useQuery } from "@tanstack/react-query";
import { fetchTrendingAnime } from "../api/anime";

export const useTrendingAnime = () => {
    return useQuery({
        queryKey: ['anime', 'trending'],
        queryFn: fetchTrendingAnime,
        staleTime: 1000 * 60 * 5,
    })
}