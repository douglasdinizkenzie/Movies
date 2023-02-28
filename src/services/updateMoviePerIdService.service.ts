import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import {
  tMovie,
  tMovieReturn,
  tMovieUpdate,
} from "../interfaces/movies.interfaces";
import { movieReturn } from "../schemas/movies.schema";

export const updateMoviePerIdService = async (
  idParams: number,
  movieData: tMovieUpdate
): Promise<tMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const oldMovie = await movieRepository.findOne({
    where: {
      id: idParams,
    },
  });

  const movieToUpdate = movieRepository.create({
    ...oldMovie,
    ...movieData,
  });

  await movieRepository.save(movieToUpdate);

  const newMovie: tMovieReturn = movieReturn.parse(movieToUpdate);

  return newMovie;
};
