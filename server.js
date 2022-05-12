// const http = require('http'); // Chunk1, relocated in ./bin/www
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Chunk2-4 are relocated in ./router/index.js
// const headers = require('./headers'); // Chunk2

// // const errorHandler = require('./errorHandler'); //Chunk3
// // const successHandler = require('./successHandler');

// const Post = require('./model/posts'); //Chunk4

const router = require('./router')

dotenv.config({path: './config.env'});
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
    .connect(DB)
    .then(() => console.log('Connected to the DB'))
    .catch(() => console.log('Error on connect to DB'))


const requestListener = async (req, res) => {
        router(req.res)
        } 

module.exports = requestListener;