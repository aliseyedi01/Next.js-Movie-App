import PageMetaHead from "@/component/Head/PageMetaHead";
import React, { useContext } from "react";
import { Movie, SaveMovie } from "@/types/Movie";
import { MoviesContext } from "@/state/movieReducer";
import ListMovies from "@/component/Movies/ListMovies";

interface WatchListProps {
  movies: Movie[];
}

const WatchList: React.FC<WatchListProps> = () => {
  const { state } = useContext(MoviesContext);

  return (
    <div className="h-screen dark:bg-indigo-950">
      <PageMetaHead title="WatchList" />
      <ListMovies movies={state.movies} />
    </div>
  );
};

export default WatchList;
