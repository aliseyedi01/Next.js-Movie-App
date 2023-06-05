import { getMovieName } from "@/Services/moviesapi";
import PageMetaHead from "@/component/Head/PageMetaHead";
import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import { Movie } from "@/types/Movie";
import ListMovies from "@/component/Movies/ListMovies";

export default function Discover() {
  const [name, setName] = React.useState("ali");
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [page, setPage] = React.useState(1);
  console.log(name);

  useEffect(() => {
    let cancelRequest = false;

    const fetchMovies = async () => {
      if (name === "") {
        setPage(1);
        setMovies([]);
      } else {
        const newMovies = await getMovieName(page.toString(), name);
        if (!cancelRequest) {
          if (page === 1) {
            setMovies(newMovies);
          } else {
            setMovies((prevMovies) => [...prevMovies, ...newMovies]);
          }
        }
      }
    };
    fetchMovies();
    return () => {
      cancelRequest = true;
    };
  }, [page, name]);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="h-screen  dark:bg-indigo-950">
      <PageMetaHead title="Discover" />
      <div className="mx-auto w-2/6 p-4 dark:text-sky-100  ">
        <TextField
          fullWidth
          label="Movie Name"
          id="fullWidth"
          value={name}
          autoComplete="off"
          className=" rounded-md dark:bg-sky-200"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          sx={{
            "& label": {
              color: "#8484ff",
              fontWeight: "bold",
            },
          }}
        />
      </div>

      <div>
        <ListMovies movies={movies} />
      </div>
    </div>
  );
}
