import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import { Low, JSONFile } from 'lowdb';

// db.json file path
const __dirname = dirname(fileURLToPath(import.meta.url))
const file = join(__dirname, '..', 'database', 'db.json')

const initiateDatabase = () => {
  // Configure lowdb to write data to JSON file
  const adapter = new JSONFile(file)
  const defaultData = { videos: [] }
  const db = new Low(adapter, defaultData)
  return db;
}

const generateId = () => {
  return Math.random().toString(36).substr(2, 9);
}

const validateVideoFields = (title, description, url) => {
  if (!title || !description || !url) {
    throw new Error('Por favor, forneça todos os campos necessários.');
  }
}

const createVideo = async (title, description, url) => {
  validateVideoFields(title, description, url);

  const newVideo = {
    id: generateId(),
    title,
    description,
    url
  };

  await db.read();
  db.data?.videos?.push(newVideo);
  await db.write();

  return newVideo;
};

const updateVideo = async (id, fieldsToUpdate) => {
  await db.read();

  const video = db.data?.videos?.find(video => video.id === id);
  const otherVideos = db.data?.videos?.filter(video => video.id === id);

  if (!video) {
    throw new Error('Vídeo não encontrado.');
  }

  const { title, description } = fieldsToUpdate;
  const newVideo = {...video}

  if (title) {
    newVideo.title = title;
  }

  if (description) {
    newVideo.description = description;
  }

  db.data = {
    videos: [...otherVideos, newVideo]
  }

  await db.write();

  return newVideo;
};

const getAllVideos = async (db) => {
  await db.read();
  return db.data?.videos ?? [];
};

export default {
  getAllVideos,
  updateVideo,
  createVideo,
  validateVideoFields,
  generateId,
  initiateDatabase
}