import { Album } from '../schemas';
import { CreateAlbumDTO } from '../dto';
import { TCreateResponse } from '../common';

const create = async (createAlbumDto: CreateAlbumDTO): Promise<TCreateResponse> => {
  const createdAlbum = await Album.create(createAlbumDto);

  return { id: createdAlbum.id };
};

export { create };
