import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import GridFsStorage from "multer-gridfs-storage";
import Grid from "gridfs-stream";
import bodyParser from "body-parser";
import path from "path";
import Pusher from "pusher";

import mongoPosts from "./postModel.js";

//storge for images
Grid.mongo = mongoose.mongo;

const app = express();
//port for heroku
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1109457",
  key: "be5049d8fe69fb10cb9b",
  secret: "78a2995a10d8676133d5",
  cluster: "eu",
  useTLS: true,
});

app.use(bodyParser.json());
app.use(cors());

//login
const adminLogin = "fakebook";
//pass
const adminPassword = "FB3C95PHuJZWYA7h";
//connect url
const mongoURI =
  "mongodb+srv://fakebook:FB3C95PHuJZWYA7h@cluster0.hb0bv.mongodb.net/fakebook?retryWrites=true&w=majority";

const conn = mongoose.createConnection(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let gfs;
conn.once("open", () => {
  console.log("connected to DataBase");

  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("images");
});

//create storge for images
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = `image-${Date.now()}${path.extname(file.originalname)}`;
      //save image to images collection
      const fileInfo = {
        filename: filename,
        bucketName: "images",
      };
      resolve(fileInfo);
      reject((err) => console.log(err));
    });
  },
});

const upload = multer({ storage });

mongoose.connect(mongoURI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("DB Connected");
  //listening for changes
  const changeStream = mongoose.connection.collection("posts").watch();
  changeStream.on("change", (change) => {
    //
    if (change.operationType === "insert") {
      pusher.trigger("posts", "inserted", {
        change: change,
      });
    } else {
      console.log("error triggering PUSHER!");
    }
  });
});

//routes
app.get("/", (req, res) => res.status(200).send("app is running"));

app.post("/upload/image", upload.single("file"), (req, res) => {
  res.status(201).send(req.file);
});

app.post("/upload/post", (req, res) => {
  const dbPost = req.body;

  //use model
  mongoPosts.create(dbPost, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/retrieve/posts", (req, res) => {
  mongoPosts.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      data.sort((b, a) => {
        return a.timestamp - b.timestamp;
      });
      res.status(200).send(data);
    }
  });
});

app.get("/retrieve/images/single", (req, res) => {
  gfs.files.findOne({ filename: req.query.name }, (err, file) => {
    if (err) {
      res.status(500).send(err);
    } else {
      if (!file || file.length === 0) {
        res.status(404).json({ err: "file not found" });
      } else {
        const readstream = gfs.createReadStream(file.filename);
        readstream.pipe(res);
      }
    }
  });
});

//listen
app.listen(port, () => console.log(`listen at PORT ${port}`));
