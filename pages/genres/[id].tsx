import React from "react";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { getSingleGenre } from "@/Services/moviesapi";
import { HomeProps, PageChangeHandler } from "@/types/Movie";
import { useRouter } from "next/router";
import ListMovies from "@/component/Movies/ListMovies";
import PaginationButtons from "@/component/Utility/PaginationButtons";

export default function SingleGenre({ movies }: HomeProps, id: number): JSX.Element {
  const router = useRouter();
  const genre_id = parseInt(router.query.id as string) || 1;

  const handlePageChange: PageChangeHandler["handlePageChange"] = (event, page) => {
    router.push(`/genres/${genre_id}?page=${page}`);
  };
  return (
    <div>
      <ListMovies movies={movies} />
      <PaginationButtons handlePageChange={handlePageChange} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async (context) => {
  const page = String(context.query.page) || "1";
  const id = String(context.query.id) || "1";

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
