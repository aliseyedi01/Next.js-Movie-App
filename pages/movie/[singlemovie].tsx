import { getMovieInfo } from "@/Services/moviesapi";
import { MovieInfo, SaveMovie, SingleMovie } from "@/types/Movie";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import PublicIcon from "@mui/icons-material/Public";
import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import PersonIcon from "@mui/icons-material/Person";
import Image from "next/image";

export default function SingleMovie() {
  const router = useRouter();
  //   console.log(router.query.singlemovie);

  const [movie, setMovie] = React.useState<MovieInfo>();

  console.log(movie);

  const movieId: string = router.query.singlemovie;
  //   console.log(movieId, typeof movieId);

  useEffect(() => {
    const fetchMovies = async () => {
      const newMovies = await getMovieInfo(movieId);
      setMovie(newMovies);
    };

    fetchMovies();
  }, []);

  return (
    <div className=" md:p-3">
      {movie ? (
        <div className="flex flex-col justify-center md:flex-row ">
          <div className="flex  items-center justify-center md:justify-normal ">
            <Image
              src={movie.poster}
              className="h-44 w-36 rounded-lg pt-2 md:h-5/6 md:w-2/3 "
              height={550}
              width={300}
              alt={movie.title}
            />
          </div>
          <div className="flex flex-col justify-between gap-2 ">
            <div className="flex  w-fit flex-col gap-3 pt-8  text-center">
              <h2 className="text-xl font-bold">{movie.title}</h2>
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
                  <p key={genre} className="rounded-xl bg-sky-400 px-2  py-1 font-bold">
                    {genre}
                  </p>
                ))}
              </div>
              <p className="flex items-center  gap-3 px-2 font-sigmar text-lg">
                <PersonIcon />
                {movie.director}
              </p>
              <p className=" w-[28rem]  px-2   text-justify font-mono md:w-[40rem]">
                <LocalMoviesIcon /> {movie.plot}
              </p>
              <p className="flex gap-2 px-2  text-center">
                <PublicIcon />
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
                  className="mx-auto h-40 w-52 rounded-3xl"
                  alt={`Screenshot ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <p>Loading movie information...</p>
      )}
    </div>
  );
}
