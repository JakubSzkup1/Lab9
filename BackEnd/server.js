// Importing required modules and setting up Express application
const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');

// Adding CORS middleware to handle Cross-Origin Resource Sharing
app.use(cors());
app.use(function(req, res, next) {
  // Configuring CORS headers
res.header("Access-Control-Allow-Origin", "*");
res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
res.header("Access-Control-Allow-Headers",
"Origin, X-Requested-With, Content-Type, Accept");
next();
});

const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// Connecting to MongoDB database using Mongoose
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb+srv://admin:admin@cluster0.cup18jx.mongodb.net/DB1?retryWrites=true&w=majority');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

// Defining the schema for the 'book' collection in the database
const bookSchema = new mongoose.Schema({
  title:String,
  cover:String,
  author:String
})

// Creating a model for the 'book' collection
const bookModel = mongoose.model('sdfsdfsdfsdfsdfffffffffffff423', bookSchema);

//find by id and delete book
app.delete('/api/book/:id',async(req,res)=>{
  console.log("Delete: "+req.params.id);

  // Finding and deleting a book by ID
  let book =  await bookModel.findByIdAndDelete(req.params.id ); //waits for response to come back first 
  res.send(book); //then this will get executed 
})

// API endpoint for updating a book by ID
app.put('/api/book/:id', async(req, res)=>{
  console.log("Update: "+req.params.id);

  // Finding and updating a book by ID with the data from the request body
  let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, {new:true});
  res.send(book);
})

// API endpoint for creating a new book
app.post('/api/book', (req,res)=>{
    console.log(req.body);

  // Creating a new book in the database using the data from the request body
    bookModel.create({
      title:req.body.title,
      cover:req.body.cover,
      author:req.body.author
    })
    .then(()=>{ res.send("Book Created")})
    .catch(()=>{ res.send("Book NOT Created")});

})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// API endpoint for retrieving all books from the database
app.get('/api/books', async(req, res)=>{  
  let books = await bookModel.find({});
  res.json(books);
})

// API endpoint for retrieving a book by ID
app.get('/api/book/:identifier',async (req,res)=>{
  console.log(req.params.identifier);

  // Finding a book by ID and sending it as a response
  let book = await bookModel.findById(req.params.identifier);
  res.send(book);
})

//listening on port 4000
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
