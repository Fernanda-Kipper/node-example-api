import express from 'express';
import videoController from '../controllers/videoController.js';

const router = express.Router();

router.post('/', videoController.createVideo);
router.get('/', videoController.getAllVideos);
router.put('/:id', videoController.updateVideo);

export default router;