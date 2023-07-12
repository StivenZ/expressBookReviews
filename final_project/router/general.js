const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username && password) {
    if (!doesExist(username)) {
      users.push({"username":username,"password":password});
      return res.status(200).json({message: "User successfully registred. Now you can login"});
    } else {
      return res.status(404).json({message: "User already exists!"});
    }
  }
  return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  let booksPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books));
    }, 2000);
  });
  booksPromise.then((response) => {
    return res.status(300).json({message: `delayed response from promise: ${response}`});
  })
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  // Using promises
  const isbn = req.params.isbn;
  let booksPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(JSON.stringify(books));
    }, 2000);
  });
  booksPromise.then((response) => {
    return res.status(300).json({message: `delayed response from promise: ${response}`});
  })
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  const author = req.params.author;
  const bookArray = Object.values(books);
  let booksPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      details = bookArray.filter((book) => book.author === author);
      resolve(JSON.stringify(details));
    }, 2000);
  });
  booksPromise.then((response) => {
    return res.status(300).json({message: `delayed response from promise: ${response}`});
  })
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const title = req.params.title;
  const bookArray = Object.values(books);
  let booksPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      details = bookArray.filter((book) => book.title === title);
      resolve(JSON.stringify(details));
    }, 2000);
  });
  booksPromise.then((response) => {
    return res.status(300).json({message: `delayed response from promise: ${response}`});
  })
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const isbn = req.params.isbn;
  const bookReview = books[isbn].reviews;
  return res.status(300).json({message: bookReview});
});

module.exports.general = public_users;
