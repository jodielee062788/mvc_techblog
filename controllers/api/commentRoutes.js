const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Fetch all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();

        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});

// Create a new comment
router.post("/", withAuth, async (req, res) => {
    try {    
      const newComment = await Comment.create({
        ...req.body,
        userId: req.session.userId,
      });
      
      res.status(200).json(newComment);
    } catch (err) {
      res.status(400).json(err);
    }
  });


module.exports = router;