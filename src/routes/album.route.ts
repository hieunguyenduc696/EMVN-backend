import { Router } from 'express';
import { createAlbum } from '../controllers';
const router = Router();

router.post('/', createAlbum);

export { router as AlbumRouter };
