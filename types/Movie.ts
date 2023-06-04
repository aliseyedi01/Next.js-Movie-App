export interface Movie {
  id: string;
  title: string;
  year: number;
  country: string;
  poster: string;
  imdb_rating: number;
}

export interface HomeProps {
  movies: Movie[];
}

export interface MetaHead {
  title?: string;
  keywords?: string;
  description?: string;
}

export interface SaveMovie {
  id: number;
  title: string;
  year: string;
  country: string;
  poster: string;
  imdb_rating: string;
  genres: string[];
  images: string[];
}

export interface SingleMovie {
  movie: SaveMovie[];
}

export interface MovieInfo {
  id: number;
  title: string;
  poster: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  director: string;
  writer: string;
  actors: string;
  plot: string;
  country: string;
  awards: string;
  metascore: string;
  imdb_rating: string;
  imdb_votes: string;
  imdb_id: string;
  type: string;
  genres: string[];
  images: string[];
}
