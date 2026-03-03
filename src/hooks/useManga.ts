import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTrendingManga } from "../api/manga";

export const useMangaQuery = ( searchQuery: string = '' ) => {
    return useInfiniteQuery({
        queryKey: ['manga', 'trending', searchQuery],
        queryFn: async ({ pageParam = 0}) => fetchTrendingManga({ limit: 20, pageParam, searchQuery }),

        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 20) return undefined
            return allPages.length * 20
        }
    })
}