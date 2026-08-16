import Package from '../models/Package.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../services/cloudinary/index.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const getPackages = asyncHandler(async (req, res) => {
  const query = req.query.enabled === 'true' ? { isEnabled: true } : {};
  const packages = await Package.find(query).sort({ order: 1 });
  res.json(packages);
});

export const getPackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) return res.status(404).json({ message: 'Package not found' });
  res.json(pkg);
});

export const createPackage = asyncHandler(async (req, res) => {
  const data = { ...req.body };
  if (req.file) {
    const result = await uploadToCloudinary(req.file.buffer, { folder: 'flyy360/packages' });
    data.imageUrl = result.secure_url;
    data.imagePublicId = result.public_id;
  }
  if (data.features && typeof data.features === 'string') {
    data.features = JSON.parse(data.features);
  }
  const pkg = await Package.create(data);
  res.status(201).json(pkg);
});

export const updatePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) return res.status(404).json({ message: 'Package not found' });

  const data = { ...req.body };
  if (req.file) {
    if (pkg.imagePublicId) await deleteFromCloudinary(pkg.imagePublicId);
    const result = await uploadToCloudinary(req.file.buffer, { folder: 'flyy360/packages' });
    data.imageUrl = result.secure_url;
    data.imagePublicId = result.public_id;
  }
  if (data.features && typeof data.features === 'string') {
    data.features = JSON.parse(data.features);
  }

  const updated = await Package.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
  res.json(updated);
});

export const deletePackage = asyncHandler(async (req, res) => {
  const pkg = await Package.findById(req.params.id);
  if (!pkg) return res.status(404).json({ message: 'Package not found' });
  if (pkg.imagePublicId) await deleteFromCloudinary(pkg.imagePublicId);
  await pkg.deleteOne();
  res.json({ message: 'Package deleted' });
});
