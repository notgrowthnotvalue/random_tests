require('dotenv').config(); // package used to load the environmental variables
const mongoose = require('mongoose'); /* imports Object-Document Mapping library for MondoDB & NodeJS. 
                                        It provides a simple and easy-to-use API for working with MongoDB databases
                                        in Node.js, including features like schema validation, middleware, and querying. */

// load enviromental variables
const mongoURI = process.env.MONGO_URI;
const mongoPASSWORD = process.env.MONGO_PASSWORD;

// connect to the database
mongoose.connect(mySecret, { useNewUrlParser: true, useUnifiedTopology: true });

// create schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: Number,
    favoriteFoods: [String]
})

// create model 
let Person = mongoose.model('Person', personSchema)

// create an instance of a Person, including attributes
const createAndSavePerson = (done) => {
    // initialized 'Person' object
    let tomJones = new Person({
        name: 'Tom',
        age: 99,
        favoriteFoods: ['pizza', 'burger', 'chicken']
    });

    // save the document (equivalent to 'record' in SQL) to 'Person' collection
    // (equivalent to 'table' in relational databases) in the database
    tomJones.save(function (err, data) {
        if (err) return console.error(err);
        done(null, data); // a callback function that is commonly used in Node.js to 
        // signal that an asynchronous operation has completed 
        // successfully and to pass the resulting data back to the
        // calling function.
    });
};

// data used to populate the database
const arrayOfPeople = [
    {
        name: 'Mary',
        age: 25,
        favoriteFoods: ['sushi', 'ramen', 'pasta']
    },
    {
        name: 'John',
        age: 42,
        favoriteFoods: ['steak', 'potatoes', 'ice cream']
    },
    {
        name: 'Jane',
        age: 35,
        favoriteFoods: ['tacos', 'burritos', 'guacamole']
    },
    {
        name: 'Bob',
        age: 18,
        favoriteFoods: ['hot dogs', 'fries', 'milkshake']
    },
    {
        name: 'Alice',
        age: 30,
        favoriteFoods: ['salad', 'smoothie', 'fruit']
    },
    {
        name: 'Dave',
        age: 50,
        favoriteFoods: ['bbq', 'beer', 'cornbread']
    },
    {
        name: 'Sarah',
        age: 27,
        favoriteFoods: ['curry', 'naan', 'chutney']
    },
    {
        name: 'Chris',
        age: 21,
        favoriteFoods: ['ramen', 'dumplings', 'bubble tea']
    },
    {
        name: 'Emily',
        age: 39,
        favoriteFoods: ['chocolate', 'cheese', 'wine']
    }
];

// Create many records and add to database
const createManyPeople = (arrayOfPeople, done) => {
    // initialize many instance of 'People'
    Person.create(arrayOfPeople, function (err, data) {
        if (err) return console.error(err);
        done(null, data)
    })
};

// Search the database
const findPeopleByName = (personName, done) => {
    // Find all the people with a given name
    Person.find({ name: personName }, function (err, personFound) {
        if (err) return console.error(err);
        done(null, personFound);
    });
};

// Search by _id, which MongoDB automatically adds this field and sets it to a unique alphanumeric key
const findPersonById = (personId, done) => {
    Person.findById({ _id: personId }, function (err, foundPerson) {
        if (err) return console.error(err);
        done(null, foundPerson);
    })
};


