export interface Manga {
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

interface fetchMangaParams {
    limit?: number,
    pageParam?: number,
    searchQuery?: string,
}

export const fetchTrendingManga = async ({ limit = 20, pageParam = 0, searchQuery = '' }: fetchMangaParams): Promise<Manga[]> => {
    let url = `https://kitsu.io/api/edge/manga?sort=-userCount&page[limit]=${limit}&page[offset]=${pageParam}`

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