const mongoose = require('mongoose');

const connectDb = async () => {
  try {
    const con = await mongoose.connect(`mongodb+srv://darshanvariya0786:drs%40245@mern-stack.hkjdslj.mongodb.net/Mern-Stack`, {

    });
    console.log(`Connected to MongoDB: ${con.connection.host}`);
  } catch (err) {
    console.log(`Error in MongoDB: ${err}`);
  }
}

module.exports = {
  connectDb
}
 