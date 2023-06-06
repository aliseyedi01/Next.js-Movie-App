import { SaveMovie } from "@/types/Movie";
import { createContext, useEffect, useReducer, Dispatch } from "react";

interface MoviesState {
  movies: SaveMovie[];
}

const initialState: MoviesState = {
  movies: [
    // {
    //   id: 36,
    //   title: "The Green Mile",
    //   poster: "https://moviesapi.ir/images/tt0120689_poster.jpg",
    //   year: "1999",
    //   country: "USA",
    //   imdb_rating: "8.5",
    //   isBookmarked: true,
    //   genres: ["Crime", "Drama", "Fantasy"],
    //   images: [
    //     "https://moviesapi.ir/images/tt0120689_screenshot1.jpg",
    //     "https://moviesapi.ir/images/tt0120689_screenshot2.jpg",
    //     "https://moviesapi.ir/images/tt0120689_screenshot3.jpg",
    //   ],
    // },
  ],
};

interface AddMovieAction {
  type: "ADD_MOVIE";
  payload: SaveMovie;
}

interface RemoveMovieAction {
  type: "REMOVE_MOVIE";
  payload: number;
}

type Action = AddMovieAction | RemoveMovieAction;

function reducer(state: MoviesState, action: Action) {
  switch (action.type) {
    case "ADD_MOVIE":
      return {
        ...state,
        movies: [...state.movies, action.payload],
      };
    case "REMOVE_MOVIE":
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.title !== action.payload.title),
      };
    default:
      throw new Error("Unknown action type");
  }
}

export interface MoviesContextProps {
  state: MoviesState;
  dispatch: Dispatch<Action>;
}

const MoviesContext = createContext<MoviesContextProps | undefined>(undefined);

function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <MoviesContext.Provider value={{ state, dispatch }}>{children}</MoviesContext.Provider>;
}

export { MoviesContext, MoviesProvider };
