import { Request, Response } from "express";
const multer = require("multer");
const path = require("path");
const fs = require("fs");

type BookRequest = {
    title: string;
    genre: string;
    year: number;
    content: string;
    duration: number;
}
const pathHandler = () => {
    if (!fs.existsSync(path.join(__dirname, "../static"))) {
      fs.mkdirSync(path.join(__dirname, "../static"));
    }
    return path.join(__dirname, "../static");
  };
  
  const diskStorage = multer.diskStorage({
    destination: (
      req: Request<BookRequest>,
      file: Express.Multer.File,
      cb: any
    ) => {
      cb(null, pathHandler());
    },
    filename: (req: Request<BookRequest>, file: any, cb: any) => {
      cb(null, file.originalname);
    },
  });
  
  function checkFileType(file: any, cb: any){
    // Allowed ext
    const filetypes = /mp3/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = file.mimetype == "audio/mpeg";
  
    if(mimetype && extname){
      return cb(null,true);
    } else {
      cb('Error: mp3 only.');
    }
  }
  
  const multerUpload = multer({ storage: diskStorage, fileFilter: (req:any, file:any, cb: any) => {
    checkFileType(file, cb);
  }}).single("file");
  
  export default multerUpload;
  