import { Request, Router } from 'express';
import { upload } from '../config/multer';
import { TCreateResponse, TypedResponse } from '../common';

const router = Router();

router.post('/', upload.single('file'), async (req: Request, res: TypedResponse<TCreateResponse>) => {
  if (req.file?.filename) {
    res.status(201).json({ id: req.file?.filename.slice(0, req.file?.filename.lastIndexOf('.')) });
  }
});

export { router as UploadRouter };
