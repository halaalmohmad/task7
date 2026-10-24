const posts = require('../models/posts');
const users = require('../models/users');
const comments= require('../models/comments');

const getAllPosts = (req, res) => {
  const { tag } = req.query;

  if (tag) {
    const filtered = posts.filter((p) => p.tags.includes(tag));
    return res.json(filtered);
  }

  res.json(posts);
};

const getPostById = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  res.json(post);
};

const createPost = (req, res) => {
  const { userId, title, content, tags } = req.body;

  if (!userId || !title || !content) {
    return res
      .status(400)
      .json({ message: 'userId, title and content are required' });
  }

  const user = users.find((u) => u.id === Number(userId));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const now = new Date().toISOString();

  const newPost = {
    id: posts.length ? posts[posts.length - 1].id + 1 : 1,
    userId: Number(userId),
    title,
    content,
    tags: tags || [],
    likes: 0,
    createdAt: now,
    updatedAt: now
  };

  posts.push(newPost);
  res.status(201).json(newPost);
};

const updatePost = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const { title, content, tags } = req.body;

  if (title !== undefined) post.title = title;
  if (content !== undefined) post.content = content;
  if (tags !== undefined) post.tags = tags;
  post.updatedAt = new Date().toISOString();

  res.json(post);
};

const deletePost = (req, res) => {
  const id = Number(req.params.id);
  const index = posts.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const deletedPost = posts.splice(index, 1)[0];
  res.json({ message: 'Post deleted', post: deletedPost });
};

const likePost = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  post.likes += 1;
  res.json(post);
};

const getPostComments = (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find((p) => p.id === id);

  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const postComments = comments.filter((c) => c.postId === id);
  res.json(postComments);
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  likePost,
  getPostComments
};