import { Request, Response } from "express";
import { tMovie, tMovieReturn } from "../interfaces/movies.interfaces";
import { createMovieService } from "../services/createMovie.service";
import { deleteMoviePerIdService } from "../services/deleteMoviePerId.service";
import { listAllMoviesService } from "../services/listAllMovies.service";
import { updateMoviePerIdService } from "../services/updateMoviePerIdService.service";

export const moviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movieRequest: tMovie = req.body;

  const newMovie = await createMovieService(movieRequest);

  return res.status(201).json(newMovie);
};

export const listAllMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { perPage, page, sort, order } = req.query;
  const movies = await listAllMoviesService(perPage, page, sort, order);

  return res.status(200).json(movies);
};

export const deleteMoviePerIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  await deleteMoviePerIdService(id);

  return res.status(204).send();
};

export const updateMoviePerIdController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const id = Number(req.params.id);
  const movieData = req.body;
  const newMovie: tMovieReturn = await updateMoviePerIdService(id, movieData);

  return res.status(200).json(newMovie);
};
