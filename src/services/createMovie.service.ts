import { AppDataSource } from "../data-source";
import { Repository } from "typeorm";
import { Movie } from "../entities";
import { tMovie, tMovieReturn } from "../interfaces/movies.interfaces";
import { movieReturn } from "../schemas/movies.schema";

export const createMovieService = async (
  movieData: tMovie
): Promise<tMovieReturn> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  const movie: Movie = movieRepository.create(movieData);
  await movieRepository.save(movie);

  const newMovie = movieReturn.parse(movie);

  return newMovie;
};
