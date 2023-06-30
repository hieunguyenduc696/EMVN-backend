import { validate } from 'class-validator';
import { NextFunction } from 'express';
import { TCreateResponse, TypedRequest, TypedResponse } from '../common';
import { ErrorException, ErrorCode } from '../errors';
import { PlaylistService } from '../services';
import { CreatePlaylistDTO } from '../dto/create-playlist.dto';

export const createPlaylist = async (
  req: TypedRequest<never, CreatePlaylistDTO, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  const newPlaylist = new CreatePlaylistDTO(req.body);

  // verify input parameters
  const errors = await validate(newPlaylist);
  if (errors.length) {
    return next(new ErrorException(ErrorCode.Validation, errors));
  }

  // create Playlist data
  try {
    const createPlaylistResponse = await PlaylistService.create(newPlaylist);

    res.status(201).json({ id: createPlaylistResponse.id });
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};

export const addTrackToPlaylist = async (
  req: TypedRequest<{ playlistId: string }, { trackId: string }, never>,
  res: TypedResponse<TCreateResponse>,
  next: NextFunction,
) => {
  // update playlist track list
  try {
    await PlaylistService.update(req.params.playlistId, req.body.trackId);

    res.status(200).json();
  } catch (error) {
    return next(new ErrorException(ErrorCode.UnknownError, error));
  }
};
