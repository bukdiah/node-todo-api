const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc!';

// Gensalt ...makes a salt
/*
bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});
*/
var hashedPassword = "$2a$10$qehjeVh5r67l7rG8g05bluJzLD5Yk3QNVt7XQF63RjY.PmMae.fO2";

// takes plan val and hash val and tells you if they are equal
bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
});
/*
var data = {
  id: 10
};

// Takes obj and signs it. Creates hash and returns token value
var token = jwt.sign(data,'123abc');
console.log(token);

// takes the token and secret and ensures data wasnt manipulated
var decoded = jwt.verify(token, '123abc');
console.log(decoded)
*/
/*
var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log(`Message: ${message}`);
console.log(`Hash: ${hash}`);

// Hashing is one way and obsfucates our plain text string

// Data we wanna send back to the client
// We want to prevent client from being able to change that id
var data = {
  id: 4
};

var token = {
  data: data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
}

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

// Salting the hash means you add something to the hash that changes it's value
// Use a different salt all the time to get new hashes

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed');
} else {
  console.log('Data was changed. Do not trust it!');
}
*/