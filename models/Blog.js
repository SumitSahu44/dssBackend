const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: String,
    slug: { type: String, unique: true },
    content: String,
    thumbnail: String,
    metaTitle: String,
    metaDescription: String
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
