const users = require('../models/users');
const posts = require('../models/posts');
const getAllUsers = (req, res) => {
  res.json(users);
};

const getUserById = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json(user);
};
const deleteUser = (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  const deletedUser = users.splice(index, 1)[0];
  res.json({ message: 'User deleted', user: deletedUser });
};

const getUserPosts = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const userPosts = posts.filter((p) => p.userId === id);
  res.json(userPosts);
};
module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserPosts
};
const createUser = (req, res) => {
  const { username, fullName, email, bio, avatar, role } = req.body;

  if (!username || !fullName || !email) {
    return res
      .status(400)
      .json({ message: 'username, fullName and email are required' });
  }

  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1,
    username,
    fullName,
    email,
    bio: bio || '',
    avatar: avatar || '',
    role: role || 'member',
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

const updateUser = (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const { username, fullName, email, bio, avatar, role } = req.body;

  if (username !== undefined) user.username = username;
  if (fullName !== undefined) user.fullName = fullName;
  if (email !== undefined) user.email = email;
  if (bio !== undefined) user.bio = bio;
  if (avatar !== undefined) user.avatar = avatar;
  if (role !== undefined) user.role = role;

  res.json(user);
};