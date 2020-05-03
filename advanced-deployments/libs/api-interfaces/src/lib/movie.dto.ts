export class Movie {
  id: string;
  picture: string;
  name: string;
  locations: MovieLocation[];
  provider: string;
  weight: number;
  external_ids?: ExternalIds;
  isFav?: boolean;
}

export class MovieLocation {
  icon: string;
  display_name: string;
  name: string;
  id: string;
  url: string;
}

export class ExternalIds {
  iva_rating?: ExternalIdData;
  imdb?: { id: string; url?: string; data?: ImdbMovie };
  tmdb?: ExternalIdData;
  wiki_data?: ExternalIdData;
  iva?: ExternalIdData;
  gracenote?: ExternalIdData;
  rotten_tomatoes?: ExternalIdData;
  facebook?: ExternalIdData;
}

export class ExternalIdData {
  id: string;
  url?: string;
}

export interface ImdbMovie {
  id: string;
  title: string;
  year: string;
  length: string;
  rating: string;
  rating_votes: string;
  poster: string;
  plot: string;
  trailer: ImdbMovieTrailer;
  cast: ImdbMovieCast[];
  technical_specs: Array<string[]>;
}

export interface ImdbMovieCast {
  actor: string;
  actor_id: string;
  character: string;
}

export interface ImdbMovieTrailer {
  id: string;
  link: string;
}
