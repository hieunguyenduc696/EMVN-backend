import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { TCreateResponse, TypedRequest, TypedResponse } from '../common';
import { ErrorException, ErrorCode } from '../errors';
import { ArtistService } from '../services';
import { CreateArtistDTO } from '../dto/create-artist.dto';

export const createArtist = async (
  req: TypedRequest<never, CreateArtistDTO, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  const newArtist = new CreateArtistDTO(req.body);

  // verify input parameters
  const errors = await validate(newArtist);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // create artist data
  try {
    const createArtistResponse = await ArtistService.create(newArtist);

    res.status(201).json({ id: createArtistResponse.id });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};
