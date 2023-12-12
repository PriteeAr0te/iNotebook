const mongoose = require('mongoose');

async function connectToMongo() {
  try {
    const client = await mongoose.connect('mongodb://localhost:27017/iNotebook',{ useNewUrlParser:true});
    console.log('Connected to MongoDB Successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

module.exports = connectToMongo;
