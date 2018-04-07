var env = process.env.NODE_ENV || 'development';

if (env === "development" || env === "test") {
  var config = require('./config.json');
  var envConfig = config[env];

  Object.keys(envConfig).forEach((key)=>{
    process.env[key] = envConfig[key];
  });
}
// Now we have different DBs for Dev and Testing
// No more wiping out the DBs when testing certain things

/*
if (env === 'development') {
  // if our environment is development, use the following PORT and MongoDBURI
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}*/