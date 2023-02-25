import { Router } from "express";
import {
  deleteMoviePerIdController,
  listAllMoviesController,
  moviesController,
  updateMoviePerIdController,
} from "../controllers/movies.controller";
import { ensureDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import { ensureMovieExistsMiddleware } from "../middlewares/ensureMovieExists.middleware";
import { ensureNameMovieIsUniqueMiddleware } from "../middlewares/ensureNameMovieIsUnique.middleware";
import { movieCreateSchema, updateMovieSchema } from "../schemas/movies.schema";

export const moviesRoutes: Router = Router();

moviesRoutes.post(
  "",
  ensureDataIsValidMiddleware(movieCreateSchema),
  ensureNameMovieIsUniqueMiddleware,
  moviesController
);

moviesRoutes.get("", listAllMoviesController);

moviesRoutes.delete(
  "/:id",
  ensureMovieExistsMiddleware,
  deleteMoviePerIdController
);

moviesRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(updateMovieSchema),
  ensureMovieExistsMiddleware,
  ensureNameMovieIsUniqueMiddleware,
  updateMoviePerIdController
);
