const { Post, User, Comment } = require('../models');

const homeController = {
  // Render the homepage with existing blog posts
  async renderHomepage(req, res) {
    try {
      // Fetch all posts with their associated user and comments
      const posts = await Post.findAll({
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['content', 'createdAt'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
        order: [['createdAt', 'DESC']],
      });

      // Render the homepage view with the retrieved posts
      res.render('home', { posts });
    } catch (error) {
      console.error('Error rendering homepage:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Add more controller methods as needed
};

module.exports = homeController;