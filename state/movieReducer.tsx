import { Movie, SaveMovie } from "@/types/Movie";
import { createContext, useReducer, Dispatch } from "react";

export interface MoviesState {
  movies: SaveMovie[];
}

const initialState: MoviesState = {
  movies: [],
};

interface AddMovieAction {
  type: "ADD_MOVIE";
  payload: Movie;
}

interface RemoveMovieAction {
  type: "REMOVE_MOVIE";
  payload: Movie;
}

type Action = AddMovieAction | RemoveMovieAction;

function reducer(state: MoviesState, action: Action): any {
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

const MoviesContext = createContext<MoviesContextProps>({} as MoviesContextProps);

function MoviesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <MoviesContext.Provider value={{ state, dispatch }}>{children}</MoviesContext.Provider>;
}

export { MoviesContext, MoviesProvider };
