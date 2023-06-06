import { getMoviesLatest } from "@/Services/moviesapi";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";
import { HomeProps } from "@/types/Movie";
import ListMovies from "@/component/Movies/ListMovies";
import PaginationButtons from "@/component/Utility/PaginationButtons";

export default function Home({ movies }: HomeProps): JSX.Element {
  const router = useRouter();

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div>
      <ListMovies movies={movies} />
      <PaginationButtons handlePageChange={handlePageChange} />
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
