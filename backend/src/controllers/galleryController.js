import Gallery from '../models/Gallery.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getGallery = asyncHandler(async (req, res) => {
  const { category, published } = req.query;
  const query = {};

  if (category && category !== 'all') query.category = category;
  if (published === 'true') query.isPublished = true;

  const items = await Gallery.find(query).sort({ order: 1, createdAt: -1 });
  res.json(items);
});

export const getGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });
  res.json(item);
});

export const createGalleryItem = asyncHandler(async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'Media file required' });

  const isVideo = req.file.mimetype.startsWith('video/');
  const result = await uploadToCloudinary(req.file.buffer, {
    folder: 'flyy360/gallery',
    resourceType: isVideo ? 'video' : 'image',
  });

  const item = await Gallery.create({
    title: req.body.title || 'Untitled',
    category: req.body.category || 'all',
    mediaType: isVideo ? 'video' : 'image',
    url: result.secure_url,
    publicId: result.public_id,
    thumbnailUrl: isVideo ? result.secure_url.replace(/\.[^.]+$/, '.jpg') : result.secure_url,
    order: parseInt(req.body.order) || 0,
    isPublished: req.body.isPublished !== 'false',
  });

  res.status(201).json(item);
});

export const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });

  if (req.file) {
    await deleteFromCloudinary(item.publicId, item.mediaType === 'video' ? 'video' : 'image');
    const isVideo = req.file.mimetype.startsWith('video/');
    const result = await uploadToCloudinary(req.file.buffer, {
      folder: 'flyy360/gallery',
      resourceType: isVideo ? 'video' : 'image',
    });
    item.url = result.secure_url;
    item.publicId = result.public_id;
    item.mediaType = isVideo ? 'video' : 'image';
  }

  const { title, category, order, isPublished } = req.body;
  if (title) item.title = title;
  if (category) item.category = category;
  if (order) item.order = parseInt(order);
  if (isPublished !== undefined) item.isPublished = isPublished === 'true' || isPublished === true;

  await item.save();
  res.json(item);
});

export const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Gallery item not found' });

  await deleteFromCloudinary(item.publicId, item.mediaType === 'video' ? 'video' : 'image');
  await item.deleteOne();
  res.json({ message: 'Gallery item deleted' });
});

export const reorderGallery = asyncHandler(async (req, res) => {
  const { items } = req.body;
  const updates = items.map(({ id, order }) =>
    Gallery.findByIdAndUpdate(id, { order }, { new: true })
  );
  const results = await Promise.all(updates);
  res.json(results);
});
