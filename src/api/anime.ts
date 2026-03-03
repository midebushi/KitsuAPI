export interface Anime {
    id: string,
    attributes: {
        canonicalTitle: string,
        synopsis: string,
        posterImage?: {
            small: string,
            large: string,
        },
        averageRating: string,
    },
}

interface fetchAnimeParams {
    limit?: number,
    pageParam?: number,
    searchQuery?: string,
}

export const fetchTrendingAnime = async ({ limit = 20, pageParam = 0, searchQuery = '' }: fetchAnimeParams): Promise<Anime[]> => {
    let url = `https://kitsu.io/api/edge/anime?sort=-userCount&page[limit]=${limit}&page[offset]=${pageParam}`

    if (searchQuery) {
        url += `&filter[text]=${encodeURIComponent(searchQuery)}`
    } else {
        url += `$sort=-userCount`
    }

    const res = await fetch(url, {
        headers: {
            'Content-type': 'application/vnd.api+json',
        },
    })

    if (!res.ok) {
        throw new Error('An error occurred while contacting Kitsu servers.')
    }

    const json = await res.json()
    return json.data
}   