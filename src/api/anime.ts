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

export const fetchTrendingAnime = async (): Promise<Anime[]> => {
    const res = await fetch('https://kitsu.io/api/edge/anime?sort=-userCount&page[limit]=10', {
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