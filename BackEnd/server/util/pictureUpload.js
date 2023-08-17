const multer = require('multer');
const path = require('path');

module.exports = {
  setting: () => {
    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'public/shopPics');
      },
      filename: function (req, file, cb) {
        const ext = path.extname(file.originalname);
        const filename =
          Date.now() + '-' + Math.floor(Math.random() * 100000) + ext;
        cb(null, filename);
      },
    });
    const upload = multer({ storage });
    return upload;
  },
};
