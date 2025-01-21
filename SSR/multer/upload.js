const fs = require("fs");
const multer = require("multer");
const path = require("path");

module.exports = (options = {}) => {
  const { dest = "../public/images" } = options;

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const dirPath = path.resolve(__dirname, dest);

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }

      cb(null, dirPath);
    },
    filename: (req, file, cb) => {
      let filetype = "";
      if (file.mimetype === "image/gif") filetype = "gif";
      if (file.mimetype === "image/png") filetype = "png";
      if (file.mimetype === "image/jpeg") filetype = "jpeg";
      if (file.mimetype === "image/jpg") filetype = "jpg";
      if (file.mimetype === "image/webp") filetype = "webp";

      cb(null, `img-${Date.now()}.${filetype}`);
    },
  });

  return multer({ storage });
};
