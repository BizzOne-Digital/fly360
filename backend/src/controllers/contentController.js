import Content from '../models/Content.js';
import Settings from '../models/Settings.js';
import Gallery from '../models/Gallery.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getAllContent = asyncHandler(async (req, res) => {
  const contents = await Content.find();
  const contentMap = {};
  contents.forEach((c) => { contentMap[c.key] = c.value; });
  res.json(contentMap);
});

export const getContentByKey = asyncHandler(async (req, res) => {
  const content = await Content.findOne({ key: req.params.key });
  if (!content) return res.status(404).json({ message: 'Content not found' });
  res.json(content);
});

export const updateContent = asyncHandler(async (req, res) => {
  const { key, value, section } = req.body;
  const content = await Content.findOneAndUpdate(
    { key },
    { value, section },
    { new: true, upsert: true, runValidators: true }
  );
  res.json(content);
});

export const bulkUpdateContent = asyncHandler(async (req, res) => {
  const updates = req.body;
  const results = [];

  for (const [key, value] of Object.entries(updates)) {
    const content = await Content.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    results.push(content);
  }

  res.json(results);
});

export const uploadHeroMedia = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'File required' });

  const isVideo = req.file.mimetype.startsWith('video/');
  const result = await uploadToCloudinary(req.file.buffer, {
    folder: 'flyy360/hero',
    resourceType: isVideo ? 'video' : 'image',
  });

  const existing = await Content.findOne({ key: 'heroMedia' });
  if (existing?.value?.publicId) {
    await deleteFromCloudinary(existing.value.publicId, existing.value.type === 'video' ? 'video' : 'image');
  }

  const heroMedia = {
    url: result.secure_url,
    publicId: result.public_id,
    type: isVideo ? 'video' : 'image',
  };

  await Content.findOneAndUpdate(
    { key: 'heroMedia' },
    { value: heroMedia, section: 'hero' },
    { upsert: true }
  );

  res.json(heroMedia);
});

export const getSettings = asyncHandler(async (req, res) => {
  const settings = await Settings.find();
  const settingsMap = {};
  settings.forEach((s) => { settingsMap[s.key] = s.value; });
  res.json(settingsMap);
});

export const updateSettings = asyncHandler(async (req, res) => {
  const updates = req.body;
  const results = [];

  for (const [key, value] of Object.entries(updates)) {
    const setting = await Settings.findOneAndUpdate(
      { key },
      { value },
      { new: true, upsert: true }
    );
    results.push(setting);
  }

  res.json(results);
});

export const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const galleryCount = await Gallery.countDocuments();
  res.json({ galleryCount });
});
