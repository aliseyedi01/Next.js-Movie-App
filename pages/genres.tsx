import { getListGenres } from "@/Services/moviesapi";
import PageMetaHead from "@/component/Head/PageMetaHead";
import { Genres, ListGenres } from "@/types/Genres";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import React from "react";

export default function Genres({ genres }: ListGenres): JSX.Element {
  const router = useRouter();

  return (
    <div>
      <PageMetaHead title="Genres" />
      <ul className="grid h-full w-full grid-cols-7 grid-rows-3  gap-x-3 gap-y-5  p-3">
        {genres.map((genre) => (
          <li>
            <div
              key={genre.id}
              className="duration-400 grid h-44 cursor-pointer place-content-center rounded-lg border-2 border-blue-300 bg-sky-200 font-ubuntu text-lg transition-all hover:border-indigo-700 hover:text-2xl hover:font-bold "
              onClick={() => {
                router.push(`/genres/${genre.id}?page=1`);
              }}
            >
              {genre.name}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const getStaticProps: GetStaticProps<ListGenres> = async () => {
  const genres = await getListGenres();
  // console.log("genres", genres);
  return { props: { genres } };
};
