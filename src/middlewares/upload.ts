// import multer, { Multer, Field, File } from "multer";
// import { RequestHandler } from "express";
// import path from "path";

// // Set up the multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads"); // Specify the destination directory for storing the uploaded files
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9); // Generate a unique filename for the uploaded file
//     const fileExtension = path.extname(file.originalname); // Get the file extension from the original filename
//     const fileName = file.fieldname + "-" + uniqueSuffix + fileExtension;
//     cb(null, fileName); // Set the filename for the uploaded file
//   },
// });

// // Create a multer instance with the storage configuration
// const upload: Multer = multer({ storage });

// /**
//  * Helper function to upload a single file
//  * @param fieldName - The name of the file field in the request body
//  * @returns Middleware function to handle the file upload
//  */
// export const uploadSingle = (fieldName: string): RequestHandler => {
//   return upload.single(fieldName);
// };

// /**
//  * Helper function to upload multiple files
//  * @param fieldName - The name of the file field in the request body
//  * @param maxCount - The maximum number of files allowed to be uploaded
//  * @returns Middleware function to handle the file upload
//  */
// export const uploadMulti = (
//   fieldName: string,
//   maxCount: number
// ): RequestHandler => {
//   return upload.array(fieldName, maxCount);
// };

import util from "util";
import multer from "multer";
import { GridFsStorage } from "multer-gridfs-storage";
import dbConfig from "@config/db.config";
import mongoose from "mongoose";
import Grid from "gridfs-stream";

export const mongoURI = "mongodb://127.0.0.1:27017/freelance";

const promise = mongoose.connect(mongoURI);

const conn = mongoose.connection;
let gfs: any;

conn.once("open", () => {
  gfs = Grid(conn, mongoose.mongo);
  gfs.collection("uploads");
});

const storage = new GridFsStorage({
  db: promise,
  file: (req, file) => {
    const match = ["image/png", "image/jpeg", "svg/webp"];

    if (match.indexOf(file.mimetype) === -1) {
      const filename = `${Date.now()}-Images-${file.originalname}`;
      return filename;
    }

    return {
      bucketName: dbConfig.imgBucket,
      filename: `${Date.now()}-Images-${file.originalname}`,
    };
  },
});

// const uploadSingle = (fieldName: string) => {
//   const upload = multer({ storage }).single(fieldName);
//   const uploadMiddleware = util.promisify(upload);
//   return uploadMiddleware;
// };

// const uploadMulti = (fieldName: string, maxCount: number) => {
//   const upload = multer({ storage }).array(fieldName, maxCount);
//   const uploadMiddleware = util.promisify(upload);
//   return uploadMiddleware;
// };

// export { uploadSingle, uploadMulti };

const uploadFiles = multer({ storage: storage }).array("file", 10);
const Upload = util.promisify(uploadFiles);

export default Upload;
