const mongoose = require('mongoose');

// let uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST_CONNECT}/${MONGO_DBNAME_CONNECT}?retryWrites=true&w=majority`;
let uri = 'mongodb+srv://admin:admin12345@cluster0.fkjkxce.mongodb.net/customerdb?retryWrites=true&w=majority';

// if (MONGO_LOCAL) {
//   // uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
//   uri = `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DBNAME}`;
// }
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
mongoose
  .connect(uri)
  .then(() => console.log('connection success: ' + uri))
  .catch((error: any) => console.error(`connection failed ${error}`));
