import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchTrendingAnime } from "../api/anime";

export const useAnimeQuery = ( searchQuery: string = '' ) => {
    return useInfiniteQuery({
        queryKey: ['anime', 'trending', searchQuery],
        queryFn: async ({ pageParam = 0}) => fetchTrendingAnime({ limit: 20, pageParam, searchQuery }),

        initialPageParam: 0,
        getNextPageParam: (lastPage, allPages) => {
            if (lastPage.length < 20) return undefined
            return allPages.length * 20
        }
    })
}