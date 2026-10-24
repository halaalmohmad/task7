const comments = require('../models/comments');
const posts = require('../models/posts');
const users = require('../models/users');

const getAllComments = (req, res) => {
  const { postId } = req.query;

  if (postId) {
    const filtered = comments.filter((c) => c.postId === Number(postId));
    return res.json(filtered);
  }

  res.json(comments);
};

const getCommentById = (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find((c) => c.id === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  res.json(comment);
};

const createComment = (req, res) => {
  const { postId, userId, text } = req.body;

  if (!postId || !userId || !text) {
    return res
      .status(400)
      .json({ message: 'postId, userId and text are required' });
  }

  const post = posts.find((p) => p.id === Number(postId));
  if (!post) {
    return res.status(404).json({ message: 'Post not found' });
  }

  const user = users.find((u) => u.id === Number(userId));
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const newComment = {
    id: comments.length ? comments[comments.length - 1].id + 1 : 1,
    postId: Number(postId),
    userId: Number(userId),
    text,
    createdAt: new Date().toISOString()
  };

  comments.push(newComment);
  res.status(201).json(newComment);
};

const updateComment = (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find((c) => c.id === id);

  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  const { text } = req.body;

  if (text !== undefined) comment.text = text;

  res.json(comment);
};

const deleteComment = (req, res) => {
  const id = Number(req.params.id);
  const index = comments.findIndex((c) => c.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Comment not found' });
  }

  const deletedComment = comments.splice(index, 1)[0];
  res.json({ message: 'Comment deleted', comment: deletedComment });
};

module.exports = {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment
};