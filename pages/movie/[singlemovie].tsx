import { getMovieInfo } from "@/Services/moviesapi";
import { MovieInfo, SaveMovie, SingleMovie } from "@/types/Movie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";
import { CircularProgress } from "@mui/material";

export default function SingleMovie() {
  const router = useRouter();

  const [movie, setMovie] = React.useState<MovieInfo>();

  const movieId = String(router.query.singlemovie);

  useEffect(() => {
    const fetchMovies = async () => {
      const newMovies = await getMovieInfo(movieId);
      setMovie(newMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div>
      {movie ? (
        <div className="flex h-full w-full flex-col justify-center dark:bg-indigo-950 md:h-[calc(100vh-68.5px)] md:flex-row md:gap-14 md:p-3 ">
          <div className="flex items-center  justify-center  md:justify-normal ">
            <Image
              src={movie.poster}
              className="h-52 w-44 rounded-lg pt-2 md:h-4/6 md:w-full "
              height={550}
              width={300}
              alt={movie.title}
            />
          </div>
          <div className="flex flex-col justify-between gap-2 dark:text-indigo-200">
            <div className="flex  w-fit flex-col gap-3 pt-4  text-center">
              <h2 className="text-xl font-bold ">{movie.title}</h2>
              <div className="flex items-center gap-2 px-2 ">
                <p className="w-fit rounded-md bg-red-600 p-1  font-bold text-yellow-400">
                  {movie.imdb_rating}
                </p>
                <p className="text-center font-sigmar text-lg font-bold">
                  {movie.released} | {movie.runtime}
                </p>
              </div>

              <div className="flex gap-2 px-2  font-serif">
                {movie.genres.map((genre) => (
                  <p
                    key={genre}
                    className="rounded-xl bg-sky-400 px-2 py-1  font-bold dark:text-white"
                  >
                    {genre}
                  </p>
                ))}
              </div>
              <p className="flex items-center  gap-3 px-2 font-sigmar text-lg">
                <PersonIcon className="dark:text-yellow-200" />
                {movie.director}
              </p>
              <p className=" w-[26rem]  px-2   text-justify font-mono md:w-[40rem]">
                <LocalMoviesIcon className="dark:text-yellow-200" /> {movie.plot}
              </p>
              <p className="flex gap-2 px-2  text-center">
                <PublicIcon className="dark:text-yellow-200" />
                {movie.country}
              </p>
            </div>
            <div className="mt-3 flex flex-col justify-center gap-4 md:flex-row">
              {movie.images.map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  height={300}
                  width={150}
                  className="mx-auto  h-40 w-52 rounded-3xl"
                  alt={`Screenshot ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid h-[91.5vh] w-full place-content-center  dark:bg-indigo-950 md:h-[calc(100vh-68.5px)]">
          <CircularProgress color="info" className="" />
        </div>
      )}
    </div>
  );
}
