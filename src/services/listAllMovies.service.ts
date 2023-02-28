import { Repository } from "typeorm";
import { number } from "zod";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { iPagination } from "../interfaces/movies.interfaces";
import { movieReturnArray } from "../schemas/movies.schema";

export const listAllMoviesService = async (
  perPage: any,
  page: any,
  sort: any,
  order: any
): Promise<iPagination> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  let take: number = Number(perPage) || 5;
  if (take > 5 || isNaN(take) || take < 0) {
    take = 5;
  }
  let skip: number = Number(page) || 1;
  if (skip < 1 || isNaN(skip)) {
    skip = 1;
  }

  let orderColumn: string = "id";
  if (sort && (sort === "price" || sort === "duration")) {
    orderColumn = sort;
  }

  let orderType: "ASC" | "DESC" = "ASC";

  if (order && order === "desc") {
    orderType = "DESC";
  }

  if (sort === undefined) {
    orderType = "ASC";
  }

  const count: number = await movieRepository.count();

  const findMovies: Array<Movie> = await movieRepository.find({
    take,
    skip: take * (skip - 1),
    order: {
      [orderColumn]: orderType,
    },
  });

  const previousPage =
    skip > 1
      ? `http://localhost:3000/movies?page=${skip - 1}&perPage=${take}`
      : null;
  const totalPages = Math.ceil(count / take);
  const nextPage =
    skip < totalPages
      ? `http://localhost:3000/movies?page=${skip + 1}&perPage=${take}`
      : null;

  const movies = movieReturnArray.parse(findMovies);

  return {
    prevPage: previousPage,
    nextPage: nextPage,
    count: count,
    data: movies,
  };
};
