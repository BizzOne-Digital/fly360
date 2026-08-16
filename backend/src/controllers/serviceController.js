import Service from '../models/Service.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getServices = asyncHandler(async (req, res) => {
  const query = req.query.published === 'true' ? { isPublished: true } : {};
  const services = await Service.find(query).sort({ order: 1 });
  res.json(services);
});

export const getService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
});

export const createService = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, { folder: 'flyy360/services' });
    data.imageUrl = result.secure_url;
    data.imagePublicId = result.public_id;
  }
  if (data.features && typeof data.features === 'string') {
    data.features = JSON.parse(data.features);
  }
  const service = await Service.create(data);
  res.status(201).json(service);
});

export const updateService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });

  const data = { ...req.body };
  if (req.file) {
    if (service.imagePublicId) await deleteFromCloudinary(service.imagePublicId);
    const result = await uploadToCloudinary(req.file.buffer, { folder: 'flyy360/services' });
    data.imageUrl = result.secure_url;
    data.imagePublicId = result.public_id;
  }
  if (data.features && typeof data.features === 'string') {
    data.features = JSON.parse(data.features);
  }

  const updated = await Service.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json(updated);
});

export const deleteService = asyncHandler(async (req, res) => {
  const service = await Service.findById(req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  if (service.imagePublicId) await deleteFromCloudinary(service.imagePublicId);
  await service.deleteOne();
  res.json({ message: 'Service deleted' });
});
