const { Post, User, Comment } = require('../models');

const postController = {
  // Render a single blog post with comments
  async renderPost(req, res) {
    try {
      const postId = req.params.id;

      // Fetch the post with its associated user and comments
      const post = await Post.findByPk(postId, {
        include: [
          {
            model: User,
            attributes: ['username'],
          },
          {
            model: Comment,
            attributes: ['comment', 'createdAt'],
            include: {
              model: User,
              attributes: ['username'],
            },
          },
        ],
      });

      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }

      // Render the post view with the retrieved post
      res.render('post', { post });
    } catch (error) {
      console.error('Error rendering post:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  // Add more controller methods as needed
};

module.exports = postController;