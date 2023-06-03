import { Movie } from "@/types/Movie";

export async function getMoviesLatest(page: string): Promise<Movie[]> {
  const res = await fetch(`https://moviesapi.ir/api/v1/movies?page=${page}`);
  const dataObject = await res.json();
  const data = dataObject.data;
  return data;
}
