const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include:[{ model: User, attributes: ['username']}],
        });
        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('homepage', { // Render the homepage template
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get("/post/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username'] },
                { model: Comment,
                  include: [{ model: User, attributes: ['username']}],
                },
            ],
        });

        if (!req.session.logged_in) { // If user is not logged in
            return res.redirect('/login'); // Redirect to the login page
        }

        const post = postData.get({ plain: true});
        const comments = post.Comments;
        
        res.render('post', {
            ...post,
            comments,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Fetch only the posts associated with the logged-in user
        const postData = await Post.findAll({
            where: { userId: req.session.userId }, // Filter by userId (assuming it's the foreign key in the Post model)
            include: [{ model: User, attributes: ['username'] }]
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        
        res.render('dashboard', { 
            posts,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/homepage');
        return;
    }
    res.render('signup');
});

router.get('/addGame', (req, res) => {
    if (req.session.logged_in) {
        res.render('addGame');
        return;
    }
    res.redirect('/login');
});

router.get("/edit/:id", async (req, res) => {
    try {
      const postData = await Post.findByPk(req.params.id, {
        include: [
          { model: User, attributes: ["username"] },
          { model: Comment,
            include: [{ model: User, attributes: ["username"] }],
          },
        ],
      });
  
      const post = postData.get({ plain: true });
  
      res.render('editPost', {
        ...post,
        logged_in: req.session.logged_in,
      });
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;