var env = process.env.NODE_ENV || 'development';

// Now we have different DBs for Dev and Testing
// No more wiping out the DBs when testing certain things
if (env === 'development') {
  // if our environment is development, use the following PORT and MongoDBURI
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}