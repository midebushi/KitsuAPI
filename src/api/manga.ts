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

export const fetchTrendingManga = async (): Promise<Manga[]> => {
    const res = await fetch('https://kitsu.io/api/edge/manga?sort=-userCount&page[limit]=20', {
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