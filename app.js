//jshint esversion:6
import express from "express";
import bodyParser from "body-parser"
import _ from "lodash";
import ejs from "ejs";
import mongoose, { mongo } from "mongoose";

// Database connection with mongodb
mongoose.connect("mongodb://127.0.0.1:27017/blogDB")
  .then(() => {
    console.log("Database created succesfully)");
  })
  .catch((err) => {
    console.log("err");
  })

// Create Schema for the data base

const blogSchema = new mongoose.Schema({
  title: String,
  body: String
})

const Post = mongoose.model("Post", blogSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// const posts = [];


app.get("/", (req, res) => {

  Post.find({})
    .then((blogFind) => {
      res.render("home.ejs", ({ posts: blogFind }));
    })
    .catch((err => {
      console.log(err);
    }));

});
app.get("/about", (req, res) => {
  res.render("about.ejs", ({ aboutContent }));
});
app.get("/contact", (req, res) => {
  res.render("contact.ejs", ({ contactContent }));
});
app.get("/compose", (req, res) => {
  res.render("compose.ejs");
});


// app.get("/posts/:postName", (req, res) => {
//   const requestedTitle = _.lowerCase(req.params.postName);

//   posts.forEach((post) => {
//     const storedTitle = _.lowerCase(post.postTitle);

//     if (storedTitle === requestedTitle) {
//       return res.render("post.ejs", ({ title: post.postTitle, content: post.postBody }))
//     }
//   });
// });
app.get("/posts/:postId", function (req, res) {
  const requestedPostId = req.params.postId;

  // Find post by id
  Post.findOne({ _id: requestedPostId }).then((post) => {
    res.render("post.ejs", {
      title: post.title,
      content: post.body,
    });
  });
});

app.post("/compose", (req, res) => {
  const postTitle = req.body["title"];
  const postBody = req.body["post"];
  // var blogPost = {

  // };
  const posts = new Post({
    title: postTitle,
    body: postBody,
  });

  posts.save();

  res.redirect("/")
});

// Server
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
