import { useQuery } from "@tanstack/react-query";
import { fetchTrendingManga } from "../api/manga";

export const useTrendingManga = () => {
    return useQuery({
        queryKey: ['manga', 'trending'],
        queryFn: fetchTrendingManga,
        staleTime: 1000 * 60 * 5,
    })
}