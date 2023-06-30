import { Playlist } from '../schemas';
import { CreatePlaylistDTO } from '../dto';
import { TCreateResponse } from '../common';

const create = async (createPlaylistDto: CreatePlaylistDTO): Promise<TCreateResponse> => {
  const createdPlaylist = await Playlist.create(createPlaylistDto);

  return { id: createdPlaylist.id };
};

const update = async (playlistId: string, trackId: string): Promise<void> => {
  await Playlist.findByIdAndUpdate(playlistId, {
    $push: {
      trackIds: trackId,
    },
  });
};

export { create, update };
