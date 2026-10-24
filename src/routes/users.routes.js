const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controller');

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById);
router.delete('/:id',usersController.deleteUser);
router.get('/:id/posts',usersController.getUserPosts);
module.exports = router;