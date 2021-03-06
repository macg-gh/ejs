//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

// Load the full build.
const _ = require('lodash');


const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

const posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get( '/' ,  function(req,res){

  res.render( 'home' , {
    startPara: homeStartingContent,
    postsArray: posts
  });


});

app.get( '/posts/:postTitle' ,  function(req,res){

  const postTitleDesiredLC=_.lowerCase(req.params.postTitle);
  console.log(postTitleDesiredLC);
  const matchingPosts=[];
  let boolMatchFound=new Boolean(false);

  console.log("looking for  : "+postTitleDesiredLC + " - Raw format is: "+req.params.postTitle);

  posts.forEach(function(post){ //start foreach
    postTitleRetrievedLC=_.lowerCase(post.title);
    if (postTitleDesiredLC === postTitleRetrievedLC ){
      console.log("Retrieved post " + postTitleRetrievedLC + " is a match!" + " - Raw format is: " + post.title);
      matchingPosts.push(post);
      boolMatchFound=true;
    }
    else {
      console.log("Retrieved post " + postTitleRetrievedLC + " is NOT a match!" + " - Raw format is: " + post.title);
    }
  }); //end foreach

  // If this below works, I don't need post.ejs
  if(boolMatchFound === true){
    res.render( 'posts' , {
      startPara: "Posts that match your request:",
      postsArray: matchingPosts
    });
  }
  else {
    res.render( 'posts' , {
      startPara: "NOT A MATCH - THERE IS NO POST OF THAT TITLE",
      postsArray: []
    });
  }

});

app.get( '/about' ,  function(req,res){

  res.render( 'about' , {aboutPara: aboutContent});

});

app.get( '/contact' ,  function(req,res){

  res.render( 'contact' , {contactPara: contactContent});

});

app.get( '/compose' ,  function(req,res){

  res.render( 'compose'  );

});

app.post("/blogpub" , function(req, res){

  const post={ title : req.body.blogPostTitle , content : req.body.blogPostContent};
  posts.push(post);
  res.redirect('/');
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
