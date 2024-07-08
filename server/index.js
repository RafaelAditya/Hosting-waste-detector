const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const multer = require('multer');
const VisitorModel = require('./models/visitor');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/visitor");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  VisitorModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success!");
        } else {
          res.json("The password is incorrect.");
        }
      } else {
        res.json("You have not registered, please register first.");
      }
    });
});

app.post('/register', (req, res) => {
  const { email } = req.body;
  VisitorModel.findOne({ email: email })
    .then(user => {
      if (user) {
        res.json("This user already exists. Please try another.");
      } else {
        VisitorModel.create(req.body)
          .then(testing => res.json(testing))
          .catch(err => res.json(err));
      }
    })
    .catch(err => res.json(err));
});

app.post('/upload', upload.single('file'), (req, res) => {
  const { originalname, path, size, mimetype } = req.file;
  const { email } = req.body; // Extract the email from the request body

  const file = {
    filename: originalname,
    path: path,
    size: size,
    type: mimetype,
    uploadedAt: new Date(),
  };

  VisitorModel.findOneAndUpdate(
    { email: email },
    { $push: { files: file } },
    { new: true }
  )
    .then(user => {
      if (user) {
        res.json("File uploaded successfully!");
      } else {
        res.json("User not found.");
      }
    })
    .catch(err => res.json(err));
});

app.listen(3001, () => {
  console.log("Server is running");
});