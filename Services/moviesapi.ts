export async function getMoviesLatest() {
  const res = await fetch("https://moviesapi.ir/api/v1/movies?page=3");
  const dataObject = await res.json();
  const data = dataObject.data;
  return data;
}
