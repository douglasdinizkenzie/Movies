import {
  movieCreateSchema,
  movieReturn,
  movieReturnArray,
  updateMovieSchema,
} from "../schemas/movies.schema";
import { z } from "zod";
import { DeepPartial } from "typeorm";
import { Repository } from "typeorm";
import { Movie } from "../entities/movies.entity";

export type tMovie = z.infer<typeof movieCreateSchema>;
export type tMovieReturn = z.infer<typeof movieReturn>;
export type tMovieReturnArray = z.infer<typeof movieReturnArray>;
export type tMovieUpdate = DeepPartial<tMovie>;
export interface iPagination {
  prevPage: string | null;
  nextPage: string | null;
  count: number;
  data: tMovieReturnArray;
}

export type iMovieCreate = z.infer<typeof movieCreateSchema>;
export type iMovieUpdate = DeepPartial<Movie>;
export type iMovieRepo = Repository<Movie>;
