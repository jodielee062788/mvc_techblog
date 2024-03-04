const router = require('express').Router();
const { Comment, Post, User } = require('../models');
const withAuth = require('../utils/auth');

router.get("/", async (req, res) => {
    try {
        const postData = await Post.findAll({
            include:[{ model: User, attributes: ['username']}],
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

router.get("/post/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                { model: User, attributes: ['username']},
                { model: Comment,
                  include: [{ model: User, attributes: ['username']}],
                },
            ],
        });

        const post = postData.get({ plain: true});

        res.render('post', {
            ...post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { userId: req.session.userId},
            include: [{ model: User, attributes: ['username']}],
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
        res.redirect('/dashboard');
        return;
    }
    res.render('login');
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
    res.render('signup');
});

router.get('/addPost', (req, res) => {
    if (req.session.logged_in) {
        res.render('addPost');
        return;
    }
    res.redirect('/login');
});

router.get("/updatePost/:id", async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User, attributes: ['username']},
            { model: Comment, 
              include: [{ model: User, attributes: ['username']}],
            },
        ],
    });

        const post = postData.get({ plain: true });

        res.render('updatePost', {
            ...post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

