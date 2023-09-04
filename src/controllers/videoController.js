import videoService from '../services/videoService.js';

const db = videoService.initiateDatabase();

const createVideo = async (req, res) => {
  try {
    const { title, description, url } = req.body;
    const newVideo = await videoService.createVideo(title, description, url);
    res.status(201).json(newVideo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllVideos = async (req, res) => {
  const videos = await videoService.getAllVideos(db);
  res.status(200).json(videos);
};

const updateVideo = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
      const updatedVideo = await videoService.updateVideo(id, updatedFields);
      res.status(200).json(updatedVideo);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
};

export default {
  updateVideo,
  createVideo,
  getAllVideos
}