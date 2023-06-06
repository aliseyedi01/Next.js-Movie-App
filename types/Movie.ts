export interface HomeProps {
  movies: Movie[];
}

export interface Movie {
  id: string | number;
  title: string;
  year: string | number;
  country: string;
  isBookMark?: boolean;
  poster: string;
  imdb_rating: string;
}

export interface SingleMovie {
  movie: SaveMovie[];
}
export interface SaveMovie {
  id: string | number;
  title: string;
  year: string;
  country: string;
  poster: string;
  isBookMark?: boolean;
  imdb_rating: string;
  genres?: string[];
  images?: string[];
}

export interface MetaHead {
  title?: string;
  keywords?: string;
  description?: string;
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

export interface PageChangeHandler {
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}
