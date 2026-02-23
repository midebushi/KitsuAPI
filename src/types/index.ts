export interface MediaItem {
  id: string;
  attributes: {
    canonicalTitle: string;
    synopsis: string;
    posterImage?: {
      small: string;
      large: string;
    };
    averageRating?: string;
  };
}