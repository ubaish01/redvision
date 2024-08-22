const multer = require("multer");
const path = require("path");
const multerS3 = require("multer-s3");
const AWS = require("aws-sdk");
const { generateS3Filename } = require("../../helper/helperFunctions");

const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.S3_BUCKET_NAME,
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: "public-read",
    key: function (req, file, cb) {
      const extension = path.extname(file.originalname);
      const filename = path.basename(file.originalname);
      const s3Filename = generateS3Filename(extension);
      cb(null, s3Filename);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 1024, // Set the field size limit to 1GB (1024 * 1024 * 1024 bytes)
  },
});

module.exports = { upload }; // using s3 to upload image
