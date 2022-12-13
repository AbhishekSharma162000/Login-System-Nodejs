const mongoose = require('mongoose');
const mongoURI = process.env.MONGODB_URI;
mongoose.set('strictQuery', true)

const conntectToMongo = mongoose.connect(
    mongoURI,
    {
      dbName: "myApp",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    (err) => err ? console.log(err) : console.log("Connected to myApp database")
  );


module.exports = conntectToMongo;