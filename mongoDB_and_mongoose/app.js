require('dotenv').config(); // package used to load the environmental variables
const mongoose = require('mongoose'); /* imports Object-Document Mapping library for MondoDB & NodeJS. 
                                        It provides a simple and easy-to-use API for working with MongoDB databases
                                        in Node.js, including features like schema validation, middleware, and querying. */

// load enviromental variables
const mongoURI = process.env.MONGO_URI;
const mongoPASSWORD = process.env.MONGO_PASSWORD;





