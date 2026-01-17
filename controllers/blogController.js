const Blog = require("../models/Blog");
const slugify = require("slugify");

// CREATE BLOG
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create({
      title: req.body.title,
      slug: slugify(req.body.title, { lower: true }),
      content: req.body.content,
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      thumbnail: req.file ? req.file.filename : null
    });

    res.status(201).json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL BLOGS
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE BLOG BY SLUG
exports.getBlogBySlug = async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
