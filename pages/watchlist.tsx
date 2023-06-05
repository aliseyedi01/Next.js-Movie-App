import PageMetaHead from "@/component/Head/PageMetaHead";
import React, { useContext } from "react";
import { SaveMovie } from "@/types/Movie";
import { MoviesContext } from "@/state/movieReducer";
import ListMovies from "@/component/Movies/ListMovies";

interface WatchListProps {
  movies: SaveMovie[];
}

const WatchList: React.FC<WatchListProps> = () => {
  const { state } = useContext(MoviesContext);

  console.log(state.movies);

  return (
    <div className="h-screen dark:bg-indigo-950">
      <PageMetaHead title="WatchList" />
      <ListMovies movies={state.movies} />
    </div>
  );
};

export default WatchList;
