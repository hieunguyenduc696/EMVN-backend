import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { TCreateResponse, TypedRequest, TypedResponse } from '../common';
import { ErrorException, ErrorCode } from '../errors';
import { AlbumService } from '../services';
import { CreateAlbumDTO } from '../dto/create-album.dto';

export const createAlbum = async (
  req: TypedRequest<never, CreateAlbumDTO, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  const newAlbum = new CreateAlbumDTO(req.body);

  // verify input parameters
  const errors = await validate(newAlbum);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // create album data
  try {
    const createAlbumResponse = await AlbumService.create(newAlbum);

    res.status(201).json({ id: createAlbumResponse.id });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};
