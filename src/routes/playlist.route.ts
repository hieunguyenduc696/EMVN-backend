import { Router } from 'express';
import { createPlaylist, addTrackToPlaylist } from '../controllers';

const router = Router();

router.post('/', createPlaylist);
router.patch('/:playlistId', addTrackToPlaylist);

export { router as PlaylistRouter };
