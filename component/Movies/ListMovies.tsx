import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Image from "next/image";
import { Suspense } from "react";
import { Grid, Skeleton } from "@mui/material";
import { HomeProps } from "@/types/Movie";

export default function ListMovies({ movies }: HomeProps) {
  return (
    <ul className=" grid grid-cols-1 place-items-center gap-4 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
      {movies.map((movie) => (
        <li key={movie.id} className=" transition-all duration-150 hover:scale-[1.02]">
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
              <Image src={movie.poster} alt="movie" width={345} height={550} />
            </Suspense>
            <CardContent>
              <Typography
                gutterBottom
                variant="h5"
                component="div"
                className="w-52 truncate font-ubuntu text-lg font-bold"
              >
                {movie.title}
              </Typography>
              <Typography className="font-mono text-sm">
                <CalendarMonthIcon className="text-xl" /> Years: {movie.year}
              </Typography>
              <Typography className="w-52 truncate font-mono text-sm">
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
  );
}
