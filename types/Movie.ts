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
