import Admin from '../models/Admin.js';
import { generateToken } from '../middleware/auth.js';
import { asyncHandler } from '../utils/asyncHandler.js';

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });
  if (!admin || !(await admin.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = generateToken(admin._id);
  res.json({
    token,
    admin: { id: admin._id, email: admin.email, name: admin.name },
  });
});

export const getMe = asyncHandler(async (req, res) => {
  res.json({ admin: req.admin });
});

export const logout = asyncHandler(async (req, res) => {
  res.json({ message: 'Logged out successfully' });
});
