import { getMoviesLatest } from "@/Services/moviesapi";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { HomeProps } from "@/types/Movie";
import ListMovies from "@/component/Movies/ListMovies";

export default function Home({ movies }: HomeProps): JSX.Element {
  const router = useRouter();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div>
      <ListMovies movies={movies} />
      <div className="grid place-content-center  pb-6 pt-2 dark:bg-indigo-950 ">
        <Pagination
          count={10}
          shape="rounded"
          onChange={handlePageChange}
          className="rounded-md dark:bg-sky-300 "
        />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const page = context.query.page || 1;

  try {
    const movies = await getMoviesLatest(page);
    return {
      props: {
        movies,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        movies: [],
      },
    };
  }
};
