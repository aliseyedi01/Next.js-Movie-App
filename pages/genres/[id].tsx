import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getSingleGenre } from "@/Services/moviesapi";
import Pagination from "@mui/material/Pagination";
import { HomeProps } from "@/types/Movie";
import { useRouter } from "next/router";
import ListMovies from "@/component/Movies/ListMovies";

export default function SingleGenre({ movies }: HomeProps, id: number): JSX.Element {
  const router = useRouter();
  const genre_id = parseInt(router.query.id as string) || 1;

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    router.push(`/genres/${genre_id}?page=${page}`);
  };
  return (
    <div>
      <ListMovies movies={movies} />
      <div className="grid place-content-center pb-4 pt-2">
        <Pagination count={10} shape="rounded" onChange={handlePageChange} />
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const page = context.query.page || 1;
  const id = parseInt(context.query.id as string) || 1;

  try {
    const movies = await getSingleGenre(page, id);

    return {
      props: {
        movies,
        id,
      },
    };
  } catch (error) {
    return {
      props: {
        movies: [],
      },
    };
  }
};
