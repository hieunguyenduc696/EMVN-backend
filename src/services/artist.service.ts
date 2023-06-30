import { Artist } from '../schemas';
import { CreateArtistDTO } from '../dto';
import { TCreateResponse } from '../common';

const create = async (createArtistDto: CreateArtistDTO): Promise<TCreateResponse> => {
  const createdArtist = await Artist.create(createArtistDto);

  return { id: createdArtist.id };
};

export { create };
