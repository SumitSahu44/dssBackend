const express = require("express");
const router = express.Router();
const { createBlog, getBlogs, getBlogBySlug } = require("../controllers/blogController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage });


router.post("/", upload.single("thumbnail"), createBlog);

// Route for uploading images from Rich Text Editor
router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  const fileUrl = `https://digitalsuccesssolutions.in/surendraadmin/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

router.get("/", getBlogs);
router.get("/:slug", getBlogBySlug);

module.exports = router;
