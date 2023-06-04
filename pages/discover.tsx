import { getMovieName } from "@/Services/moviesapi";
import PageMetaHead from "@/component/Head/PageMetaHead";
import { TextField } from "@mui/material";
import React, { useEffect } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";
import { Movie } from "@/types/Movie";

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
    <div>
      <PageMetaHead title="Discover" />
      <div className="mx-auto w-2/6 p-4">
        <TextField
          fullWidth
          label="Movie Name"
          id="fullWidth"
          value={name}
          autoComplete="off"
          className=" "
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
      </div>

      <div>
        <ul className="  lg:grid-cols-5ssss grid grid-cols-1 place-items-center gap-3 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  ">
          {movies.map((movie, index) => (
            <li key={index}>
              <Card sx={{ maxWidth: 345 }}>
                <Suspense
                  fallback={
                    <Skeleton
                      sx={{ bgcolor: "grey.900" }}
                      variant="rectangular"
                      width={250}
                      height={340}
                    />
                  }
                >
                  <Image
                    src={movie.poster}
                    alt="movie"
                    className="grayscale hover:grayscale-0"
                    width={345}
                    height={550}
                  />
                </Suspense>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="w-52 truncate font-sigmar text-lg"
                  >
                    {movie.title}
                  </Typography>
                  <Typography className="font-ubuntu text-sm">
                    <CalendarMonthIcon className="text-xl" /> Years: {movie.year}
                  </Typography>
                  <Typography className="w-52 truncate font-ubuntu text-sm">
                    <PublicIcon className="text-xl" /> Country: {movie.country}
                  </Typography>
                </CardContent>
                <CardActions className="flex flex-row-reverse justify-between">
                  <Typography className="w-9 cursor-default rounded-lg border-2 bg-red-200 p-1">
                    {movie.imdb_rating}
                  </Typography>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
