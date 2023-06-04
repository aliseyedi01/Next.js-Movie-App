import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getSingleGenre } from "@/Services/moviesapi";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import PublicIcon from "@mui/icons-material/Public";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Pagination from "@mui/material/Pagination";
import { HomeProps } from "@/types/Movie";
import Image from "next/image";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";

export default function SingleGenre({ movies }: HomeProps, id: number): JSX.Element {
  const router = useRouter();
  const genre_id = parseInt(router.query.id as string) || 1;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/genres/${genre_id}?page=${page}`);
  };
  return (
    <div>
      <ul className="  lg:grid-cols-5ssss grid grid-cols-1 place-items-center gap-3 p-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5  ">
        {movies.map((movie) => (
          <li key={movie.id}>
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
      <div className="grid place-content-center pb-4 pt-2">
        <Pagination count={10} shape="rounded" onChange={handlePageChange} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const page = context.query.page || 1;
  const id = parseInt(context.query.id as string) || 1;

  // console.log(context.query);
  // console.log("Page:", page);
  // console.log("ID:", id);

  try {
    const movies = await getSingleGenre(page, id);
    // console.log("2", movies);
    return {
      props: {
        movies,
        id,
      },
    };
  } catch (error) {
    // console.error(error);
    return {
      props: {
        movies: [],
      },
    };
  }
};
