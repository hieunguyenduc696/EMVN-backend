import { Router } from 'express';
import { createArtist } from '../controllers';
const router = Router();

router.post('/', createArtist);

export { router as ArtistRouter };
