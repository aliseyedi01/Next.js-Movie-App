export type Genres = {
  id: number;
  name: string;
};

export interface ListGenres {
  genres: Genres[];
}
